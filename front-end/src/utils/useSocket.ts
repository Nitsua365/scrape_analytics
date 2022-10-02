import { useState, useEffect, ObjectHTMLAttributes } from 'react'

import { useAppContext } from '../context/AppContext';

interface DataPoint {
  time: Object,
  cpuCurrentSpeed: Object,
  cpuTemperature: Object,
  mem: Object,
  networkStats: Object,
  processLoad: Object,
  disksIO: Object
}

const useSocket = ({ key, trackHistory=true, points=1 }) => {

  const { socket } = useAppContext();

  const [data, setData] = useState<Array<DataPoint> | DataPoint>((trackHistory) ? [] : {});
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true))
    socket.on('disconnect', () => setIsConnected(false));
    socket.on(key, (data) => setData(curr => ((trackHistory) ? [...curr, data] : data)))

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off(key);
    };
  }, []);

  return { 
          isConnected, 
          data, 
          mostRecentResult: (trackHistory) ? data[data.length - 1] : data, 
          hasData: (trackHistory) ? data.length > 0 : Object.keys(data).length
        }
}

export default useSocket;