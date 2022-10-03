import { useState, useEffect } from 'react'

import { useAppContext } from '../context/AppContext';

const useSocket = ({ 
  key, 
  trackHistory=true, 
  points=20 
}) => {

  const { socket } = useAppContext();

  const [data, setData] = useState((trackHistory) ? [] : {});
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false));
    socket.on(key, (data) => setData((curr) => {
      if (trackHistory) {
        if ([...curr, data].length > 100) curr.pop(0)
        return [...curr, data]
      }
      else return data
      
    }))

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(key);
    };
  }, [trackHistory, key, socket]);

  return { isConnected, 
          data: (trackHistory) ? data.slice(-points) : data, 
          mostRecentResult: (trackHistory) ? data[data.length - 1] : data, 
          hasData: (trackHistory) ? data.length > 0 : Object.keys(data).length
        }
}

export default useSocket;