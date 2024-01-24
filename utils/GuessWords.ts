// utils.ts

import {InkData} from "../model/types";

export async function fetchGuessWords(inkData: InkData): Promise<string[]> {
    const url = 'https://inputtools.google.com/request?ime=handwriting&app=quickdraw&dbg=1&cs=1&oe=UTF-8';

    // Preparing headers
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Sec-Fetch-Site", "cross-site");
    myHeaders.append("Accept-Language", "de-DE,de;q=0.9");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Origin", "https://quickdraw.withgoogle.com");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15");
    myHeaders.append("Referer", "https://quickdraw.withgoogle.com/");


    // Preparing the request body
    const body = JSON.stringify({
        input_type: 0,
        requests: [
            {
                language: "quickdraw",
                writing_guide: {width: 752, height: 820},
                ink: inkData
            }
        ]
    });


    // Fetch request
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: myHeaders,
            body: body
        });
        const data = await response.json();
        console.log(data);
        if (data[0] === "SUCCESS") {
            return data[1][0][1]; // Extracting the guessed words
        } else {
            throw new Error('Failed to fetch guessed words');
        }
    } catch (error) {
        console.error('Error fetching guessed words:', error);
        throw error;
    }
}

