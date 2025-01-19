import React from "react";
import styles from "./PlaceHolder.module.css";

const PlaceHolder = () => {
    return (
        <div className={styles.container}>
            <div className={styles.notice}>
                <h2>Discover Hackathons Worldwide</h2>
                <p>Flight-optimized hackathon discovery platform</p>
                <div className={styles.badges}>
                    <span>Next.js</span>
                    <span>React</span>
                    <span>Node.js</span>
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.section}>
                    <h3>Technical Stack</h3>
                    <ul>
                        <li>Next.js/React frontend with CSS Modules</li>
                        <li>Full monitoring: k6, Prometheus, Grafana</li>
                        <li>Docker-based deployment with Compose</li>
                        <li>Real-time metrics with 5s dashboard updates</li>
                    </ul>
                </div>
                <div className={styles.section}>
                    <h3>Performance</h3>
                    <ul>
                        <li>20 VUs for average load testing</li>
                        <li>100 VUs for stress testing</li>
                        <li>Sub-1% error rate threshold</li>
                        <li>Sub-500ms p95 response times</li>
                    </ul>
                </div>
                <div className={styles.section}>
                    <h3>Core Problem</h3>
                    <p>
                        Standard hackathon selection breaks down at scale. Manual flight comparison 
                        becomes intractable, prices fluctuate constantly, and geographic constraints 
                        limit participation. No existing solutions combine hackathon and flight data effectively.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlaceHolder;