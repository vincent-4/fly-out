import React, { useState, useRef } from "react";
import styles from "./SearchBar.module.css";
import LocationSearchBar from "./LocationSearchBar";

const initialState = {
    valid: false,
    country: "",
    state: "",
    city: "",
};

const SearchBar = (props) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [address, setAddress] = useState(initialState);
    console.log(startDate);
    const searchData = async () => {
        if (!address.valid) return;
        props.setIsLoading(true);
        const response = await fetch(`/api/aggregate`, {
            method: "POST",
            body: JSON.stringify({
                location: address.city ? address.city : address.state,
                date: {
                    start: startDate ? startDate : null,
                    end: endDate ? endDate : null,
                },
            }),
        });
        const data = await response.json();
        props.setHackDate(data);
        props.setIsLoading(false);
    };

    return (
        <div className={styles.header}>
            <div>
                <div className={styles.container}>
                    <div className={styles.conditionInput1}>
                        <label htmlFor="location" className={styles.label}>
                            Location
                        </label>
                        <div className={styles.datePick1}>
                            <LocationSearchBar
                                address={address}
                                setAddress={setAddress}
                            />
                        </div>
                    </div>
                    <div className={styles.conditionInput2}>
                        <label htmlFor="stateDate" className={styles.label}>
                            Hackathon Start Date
                        </label>
                        <input
                            id="startDate"
                            type="date"
                            className={styles.datePick2}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            aria-label="Start date for hackathon search"
                        />
                    </div>
                    <div className={styles.conditionInput3}>
                        <div style={{ width: "80%" }}>
                            <label htmlFor="endDate" className={styles.label}>
                                Hackathon End Date
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                className={styles.datePick3}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                aria-label="End date for hackathon search"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button
                    className={`${styles.button} ${
                        address.valid ? "" : styles.disabled
                    }`}
                    onClick={searchData}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
