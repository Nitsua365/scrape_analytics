import {useState, useEffect} from 'react'

const useSocket = (socket, key) => {

    const [data, setData] = useState([]);
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        socket.on('connect', () => setIsConnected(true))
        socket.on('disconnect', () => setIsConnected(false));
        socket.on(key, (cpuData) => setData(curr => [...curr, cpuData]))
    
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          socket.off(key);
        };
    }, []);

    return { isConnected, data }
}

export default useSocket;