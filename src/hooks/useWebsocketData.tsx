import { useEffect, useState } from 'react';
// import WebsocketHandle from './websocketHandle';
import { iMessage } from '../interfaces';


const useWebsocketData = () => {
  const [data, setData] = useState<iMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const websocket = new WebSocket(
      'wss://realtime.ably.io/?key=RxFdLA.yZ2-Nw%3AafEZXcBGPQNyAMy1HxRST0vIGTfUBuyetK1kRYtA9ug&format=json&heartbeats=true&v=1.2&agent=ably-js%2F1.2.17%20browser'
    );

    websocket.onopen = () => {
      console.log('WebSocket connected');
      websocket.send(JSON.stringify({ action: 10, channel: 'test' }));
    };

    websocket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      // setData(receivedData);
      setIsLoading(false);

      if (receivedData.action === 15) {
        const message = JSON.parse(receivedData.messages[0].data);
        // WebsocketHandle(message) 
        console.log(message);
        setData(message);
      }
    };

    websocket.onclose = () => {
      console.log('WebSocket closed');
    };

    // Clean up the WebSocket when the component unmounts
    return () => {
      websocket.close();
    };
  }, []);
  // console.log(data)
  return { data, isLoading };
};

export default useWebsocketData;
