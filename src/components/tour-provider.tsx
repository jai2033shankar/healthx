"use client";

import { useEffect } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function TourProvider() {
    useEffect(() => {
        const hasSeenTour = localStorage.getItem("helixflow_tour_seen");
        if (!hasSeenTour) {
            const driverObj = driver({
                showProgress: true,
                animate: true,
                steps: [
                    { 
                        element: 'header', 
                        popover: { 
                            title: 'Welcome to HelixFlow AI', 
                            description: 'This is the master navigation header. Access search and profile settings here.', 
                            side: "bottom", 
                            align: 'start' 
                        }
                    },
                    { 
                        element: '.w-64, .w-20', 
                        popover: { 
                            title: 'Dynamic Navigation', 
                            description: 'Access Authorizations, Claims, and advanced rules engines here. You can collapse this menu using the chevron arrow to maximize your screen space.', 
                            side: "right", 
                            align: 'start' 
                        }
                    },
                    { 
                        element: 'main', 
                        popover: { 
                            title: 'Dashboard Intel', 
                            description: 'Monitor live system parameters, predictive agent insights, and platform analytics from this primary overview.', 
                            side: "top", 
                            align: 'start' 
                        }
                    },
                ],
                onDestroyStarted: () => {
                    if (!driverObj.hasNextStep() || confirm("Are you sure you want to exit the interactive platform tour?")) {
                        localStorage.setItem("helixflow_tour_seen", "true");
                        driverObj.destroy();
                    }
                },
            });
            
            // Allow DOM and animations to mount gracefully before engaging tour
            setTimeout(() => {
                driverObj.drive();
            }, 800); 
        }
    }, []);

    // Provider strictly triggers client-side lifecycle effects, rendering null transparently
    return null;
}
