import React, { useState, useEffect } from 'react';
import { JSDOM } from 'jsdom';

function UniversityApi() {
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const dom = await JSDOM.fromURL('https://diemthi.tuyensinh247.com/diem-chuan.html');
                const document = dom.window.document;

                const universities = [];

                const threadItems = document.querySelectorAll('ul#benchmarking > li');

                threadItems.forEach((item) => {
                    const linkNode = item.querySelector('a');
                    const link = 'https://diemthi.tuyensinh247.com' + linkNode.getAttribute('href');
                    const uniName = linkNode.getAttribute('title');
                    const uniCode = item.querySelector('strong.clblue2').textContent;

                    universities.push({
                        uniCode: uniCode,
                        uniName: uniName,
                        url: link
                    });
                });

                setUniversities(universities);
            } catch (error) {
                console.error('Lỗi khi fetch HTML:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Danh sách trường đại học</h1>
            <ul>
                {universities.map((university, index) => (
                    <li key={index}>
                        <a href={university.url}>{university.uniName}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UniversityApi;
