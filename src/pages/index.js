import Head from "next/head";
import Image from "next/image";
import Search from "../Components/Search";
import SearchBar from "../Components/SearchBar";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Spinner from "../Components/Spinner"

import { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PlaceHolder from "@/Components/PlaceHolder";

const inter = Inter({ subsets: ["latin"] });

import { Location, Date, Price, Link } from "../Components/UI/Icons";

export default function Home() {
    const [hackData, setHackData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const setHackDataHandler = (data) => {
        console.log(data);
        let hackData = [];
        for (const hackathon of data) {
            const hackObject = {};
            hackObject["Name"] = hackathon.hackathon.hackathonName;
            hackObject["imageURL"] = hackathon.hackathon.imgURL;
            hackObject["location"] = {
                value: hackathon.hackathon.hackathonLocation,
                Icon: Location,
            };
            hackObject["date"] = {
                value: hackathon.hackathon.hackathonDate,
                Icon: Date,
            };
            hackObject["url"] = {
                value: {
                    url: hackathon.hackathon.url || "#",
                    text: "Go To Website",
                },
                Icon: Link,
            };
            const flightObject = {};
            flightObject["source"] = {
                value: hackathon.flight.source.name,
                code: hackathon.flight.source.displayCode,
                Icon: Location,
            };
            flightObject["destination"] = {
                value: hackathon.flight.destination.name,
                code: hackathon.flight.destination.displayCode,
                Icon: Location,
            };
            flightObject["price"] = {
                value: hackathon.flight.price,
                Icon: Price,
            };
            flightObject["Carriers"] = hackathon.flight.Carriers;
            flightObject["Duration"] =
                hackathon.flight.totalDuration.toFixed(2);

            hackData.push({
                hackathon_info: hackObject,
                flight_info: flightObject,
            });
        }
        setHackData(hackData);
    };

    return (
        <>
            <Head>
                <title>Flyout - Find Hackathons Worldwide</title>
                <meta name="description" content="Discover hackathons based on flight availability and costs" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={inter.className}>
                <Header />
                <SearchBar setHackDate={setHackDataHandler} setIsLoading={setIsLoading} />
                {isLoading && <Spinner />}
                {!isLoading && !hackData && <PlaceHolder />}
                {!isLoading && hackData && hackData.map((data, index) => (
                    <Search key={index} hackData={data} />
                ))}
                <Footer />
            </main>
        </>
    );
}
