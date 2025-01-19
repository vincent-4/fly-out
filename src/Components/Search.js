import React, { useState, useMemo } from "react";
import styles from "./Search.module.css";

import Modal from "./UI/Modal";
import DetailCart from "./UI/Cart/DetailCart";
import PlaceHolder from "./PlaceHolder";

import { Location, Date, Price, Link } from "./UI/Icons";

const dummyData = {
    hackathon_info: {
        name: "Sample Hackathon",
        imageURL:
            "https://s3.amazonaws.com/assets.mlh.io/events/logos/000/212/477/thumb/brickhack100x100.png?1674064309",
        location: {
            value: "Times Square",
            Icon: Location,
        },
        date: {
            value: "Feb 18-19",
            Icon: Date,
        },
        url: {
            value: {
                url: "",
                text: "Go To Website",
            },
            Icon: Link,
        },
    },
    flight_info: {
        source: {
            value: "Los Angeles International",
            code: "LAX",
            Icon: Location,
        },
        destination: {
            value: "Times Square",
            code: "JFK",
            Icon: Location,
        },
        price: {
            value: "299.99$",
            Icon: Price,
        },
        Carriers: "United Airlines",
        Duration: "5.5",
    },
};

const Search = ({ hackData }) => {
    const [onHover, setOnHover] = useState(false);

    const memoizedModal = useMemo(() => (
        <Modal
            active={onHover}
            center={true}
            color="transparent"
            deactive={setOnHover.bind(null, false)}
        >
            <DetailCart
                hackathon_info={hackData.hackathon_info}
                flight_info={hackData.flight_info}
            />
        </Modal>
    ), [onHover, hackData]);

    return (
        <>
            <ul className={styles.result} onClick={setOnHover.bind(null, true)}>
                <li className={styles.item}>
                    <img
                        className={styles.logo}
                        src={hackData.hackathon_info.imageURL}
                        alt="logo"
                    ></img>

                    <div className={styles.content}>
                        <div className={styles.info}>
                            <div className={styles.title}>
                                {hackData.hackathon_info.name}
                            </div>
                            <div className={styles.time}>
                                {hackData.hackathon_info.date.value}
                            </div>
                            <div className={styles.location}>
                                {hackData.hackathon_info.location.value}
                            </div>
                            <div className={styles.pattern}>In-Person Only</div>
                            <div></div>
                        </div>
                        <div className={styles.price}>
                            <div className={styles.priceNumber}>
                                {hackData.flight_info.price.value}
                            </div>
                            <div className={styles.round}>One-Way</div>
                        </div>
                    </div>
                </li>
            </ul>
            {memoizedModal}
        </>
    );
};
export default Search;
