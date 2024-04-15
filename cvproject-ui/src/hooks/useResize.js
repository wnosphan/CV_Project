import React from 'react'
import { useInView } from 'react-intersection-observer'

const useResize = () => {
    const [pageSize, setPageSize] = React.useState(10);
    const [ref, inView] = useInView({threshold: 0});

    React.useEffect(()=> {
        const handleResize = () => {
            if (!inView) {
                const pagination = document.querySelector('.pagination').getBoundingClientRect();
                const winHeight = window.innerHeight;
                const pageSizeChanger = Math.ceil((Math.abs(winHeight - pagination.bottom) + pagination.height) / 64.8);
                setPageSize(pageSizeChanger)
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    },[inView])
    return { ref, pageSize };
}

export default useResize