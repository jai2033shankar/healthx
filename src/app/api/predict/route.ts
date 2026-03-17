import { NextResponse } from 'next/server';
import { Client } from 'pg';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'hospital-twin') {
        // Simulated Hospital Operations Twin Data (Wait times, capacities over next 24 hours)
        const data = [];
        let currentWait = 45; // baseline wait time in mins
        let icuCapacity = 85; // baseline %
        
        for (let i = 0; i < 24; i++) {
            currentWait += (Math.random() * 20 - 9); // Random walk
            icuCapacity += (Math.random() * 10 - 4);
            
            data.push({
                hour: `${i}:00`,
                predictedWaitTime: Math.max(0, Math.round(currentWait)),
                predictedIcuCapacity: Math.min(100, Math.max(0, Math.round(icuCapacity))),
                surgeRisk: currentWait > 60 || icuCapacity > 90
            });
        }
        
        return NextResponse.json({
            status: 'success',
            data,
            recommendation: "Increase ED nursing staff by 18:00 due to predicted 75+ min wait times."
        });
    }

    if (type === 'revenue') {
        const client = new Client({
            user: process.env.POSTGRES_USER || 'postgres',
            password: process.env.POSTGRES_PASSWORD || 'password',
            host: process.env.POSTGRES_HOST || '127.0.0.1',
            database: process.env.POSTGRES_DB || 'helixflow_db',
            port: parseInt(process.env.POSTGRES_PORT || '5433'),
        });
        
        try {
            await client.connect();
            // Query total revenue (paid vs total submitted) grouped by day over last 30 days
            const res = await client.query(`
                SELECT 
                    DATE(created_at) as date,
                    SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) as collected,
                    SUM(total_amount) as total_billed
                FROM claims
                WHERE created_at >= NOW() - INTERVAL '30 days'
                GROUP BY DATE(created_at)
                ORDER BY DATE(created_at) ASC;
            `);
            
            const historicalData = res.rows.map(row => ({
                date: row.date.toISOString().split('T')[0],
                collected: parseFloat(row.collected),
                billed: parseFloat(row.total_billed),
                leakageDetected: parseFloat(row.total_billed) - parseFloat(row.collected),
                type: 'historical'
            }));

            // Simple extrapolation for next 14 days
            const forecastData = [];
            const lastDate = historicalData.length > 0 ? new Date(historicalData[historicalData.length-1].date) : new Date();
            
            // Calculate averages from last 5 days
            const recent = historicalData.slice(-5);
            const avgBilled = recent.reduce((sum, d) => sum + d.billed, 0) / (recent.length || 1) || 5000;
            const avgCollected = recent.reduce((sum, d) => sum + d.collected, 0) / (recent.length || 1) || 4000;

            for (let i = 1; i <= 14; i++) {
                const nextDate = new Date(lastDate);
                nextDate.setDate(lastDate.getDate() + i);
                
                forecastData.push({
                    date: nextDate.toISOString().split('T')[0],
                    collected: avgCollected * (1 + (Math.random() * 0.1 - 0.05)),
                    billed: avgBilled * (1 + (Math.random() * 0.1 - 0.05)),
                    leakageDetected: (avgBilled - avgCollected) * (1 + (Math.random() * 0.1 - 0.05)),
                    type: 'forecast'
                });
            }

            return NextResponse.json({
                status: 'success',
                data: [...historicalData, ...forecastData]
            });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ status: 'error', message: 'Database query failed' }, { status: 500 });
        } finally {
            await client.end();
        }
    }

    return NextResponse.json({ status: 'error', message: 'Invalid prediction type' }, { status: 400 });
}
