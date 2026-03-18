import { Client } from 'pg';
import { faker } from '@faker-js/faker';

const client = new Client({
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'helixflow_db',
    port: parseInt(process.env.POSTGRES_PORT || '5433'),
});

async function seed() {
    await client.connect();
    console.log('Connected to database. Starting seeding...');

    // 1. Tenants
    const tenantIds: string[] = [];
    for (let i = 0; i < 5; i++) {
        const res = await client.query(
            `INSERT INTO tenants (name, type) VALUES ($1, $2) RETURNING id`,
            [faker.company.name() + (i % 2 === 0 ? ' Hospital' : ' Health'), i % 2 === 0 ? 'hospital' : 'payer']
        );
        tenantIds.push(res.rows[0].id);
    }
    console.log(`Seeded ${tenantIds.length} tenants.`);

    // 2. Users
    const userIds: string[] = [];
    for (let i = 0; i < 20; i++) {
        const role = i % 5 === 0 ? 'admin' : (i % 2 === 0 ? 'provider' : 'coder');
        const res = await client.query(
            `INSERT INTO users (tenant_id, name, email, role) VALUES ($1, $2, $3, $4) RETURNING id`,
            [faker.helpers.arrayElement(tenantIds), faker.person.fullName(), faker.internet.email(), role]
        );
        userIds.push(res.rows[0].id);
    }
    console.log(`Seeded ${userIds.length} users.`);

    // 3. Patients
    const patientIds: string[] = [];
    for (let i = 0; i < 100; i++) {
        const res = await client.query(
            `INSERT INTO patients (tenant_id, first_name, last_name, dob, gender, mrn) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            [
                faker.helpers.arrayElement(tenantIds),
                faker.person.firstName(),
                faker.person.lastName(),
                faker.date.birthdate({ min: 1, max: 90, mode: 'age' }),
                faker.person.sex(),
                faker.string.alphanumeric(10).toUpperCase()
            ]
        );
        patientIds.push(res.rows[0].id);
    }
    console.log(`Seeded ${patientIds.length} patients.`);

    // 4. Prior Authorizations
    const procedures = ['99213', '99214', '70450', '73221', '80053'];
    const diagnoses = ['J01.90', 'E11.9', 'I10', 'M54.5', 'R07.9'];
    for (let i = 0; i < 50; i++) {
        const createdAt = faker.date.recent({ days: 60 });
        await client.query(
            `INSERT INTO prior_authorizations (patient_id, provider_id, payer_id, procedure_code, diagnosis_code, status, ai_approval_probability, ai_recommendation, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
                faker.helpers.arrayElement(patientIds),
                faker.helpers.arrayElement(userIds),
                faker.helpers.arrayElement(tenantIds),
                faker.helpers.arrayElement(procedures),
                faker.helpers.arrayElement(diagnoses),
                faker.helpers.arrayElement(['pending', 'approved', 'denied']),
                faker.number.float({ min: 0.1, max: 0.99, fractionDigits: 2 }),
                faker.lorem.sentence(),
                createdAt
            ]
        );
    }
    console.log(`Seeded 50 prior authorizations.`);

    // 5. Claims and Denials
    for (let i = 0; i < 200; i++) {
        const status = faker.helpers.arrayElement(['submitted', 'paid', 'denied']);
        const createdAt = faker.date.recent({ days: 90 });
        
        const res = await client.query(
            `INSERT INTO claims (patient_id, provider_id, payer_id, total_amount, status, ai_confidence_score, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            [
                faker.helpers.arrayElement(patientIds),
                faker.helpers.arrayElement(userIds),
                faker.helpers.arrayElement(tenantIds),
                faker.number.float({ min: 100, max: 10000, fractionDigits: 2 }),
                status,
                faker.number.float({ min: 0.4, max: 0.99, fractionDigits: 2 }),
                createdAt
            ]
        );
        const claimId = res.rows[0].id;

        if (status === 'denied') {
            await client.query(
                `INSERT INTO denials (claim_id, reason_code, description, ai_recovery_prediction, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    claimId,
                    faker.helpers.arrayElement(['PR-1', 'CO-4', 'CO-11', 'PR-16']),
                    faker.lorem.sentence(),
                    faker.number.float({ min: 0.1, max: 0.95, fractionDigits: 2 }),
                    faker.helpers.arrayElement(['open', 'appealed', 'resolved']),
                    createdAt
                ]
            );
        }
    }
    console.log(`Seeded 200 claims and corresponding denials.`);

    await client.end();
    console.log('Seeding complete.');
}

seed().catch((err) => {
    console.error('Error seeding data:', err);
    client.end();
    process.exit(1);
});
