import { useState, useEffect } from 'react';
import Link from 'carbon-react/lib/components/link';

export const JustLinks = () => {

  const [data,setData]=useState([]);

  const getData=()=> {
    fetch('/dls-release-notes/api/en-GB/links.json')
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
  }
  useEffect(()=> {
    getData()
  },[])

  return (
    <div>
      {data.map((item, index) => (
        <div style={{marginBottom: '6px'}} key={index}>
          <Link href={item.href} target="_blank">{item.link}</Link>
        </div>
      ))}
    </div>
  );
}

export default JustLinks;