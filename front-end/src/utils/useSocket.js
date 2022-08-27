import { useState, useEffect } from 'react'

import { useAppContext } from '../context/AppContext';

const useSocket = (key) => {

  const { socket } = useAppContext();

  const [data, setData] = useState([]);
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false));
    socket.on(key, (data) => setData(curr => [...curr, data]))

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(key);
    };
  }, []);

  return { isConnected, data, mostRecentResult: data[data.length - 1], hasData: data.length > 0 }
}

export default useSocket;