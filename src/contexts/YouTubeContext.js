import React, { createContext, useState, useEffect } from "react";

const YouTubeContext = createContext();

const YouTubeProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getTrending = async () => {
      const response = await fetch("https://www.youtube.com/api/stats/watchtime?ns=yt&el=embedded&cpn=IUZabfHLX3VwdvHj&docid=7pT7Hhpoemc&ver=2&referrer=https%3A%2F%2Fwww.youtube.com%2Fembed%2F7pT7Hhpoemc%3Frel%3D0%26showinfo%3D0%26autoplay%3D1&cmt=19.174&ei=uG0wX7aPENaxwQSXpI64Cg&fmt=396&fs=0&rt=29.005&of=By2ftiEPu4RYWgm23Klu4Q&euri=https%3A%2F%2Fmovies.jason.codes%2F&lact=7412&cl=325111879&state=paused&vm=CAEQABgEKixjTmVTTjVNSV91Ui1Xa3dqcTlHYXNEN1U2X0xnTnNON0hrZ25Fem4wbXNzPToyQUdiNlo4TWtnYW5BN2RMSlk2QmtydUZhdko5M3BpeDZxZ1pEc1VNMnlGd0xteWNqdFE&volume=100&c=WEB_EMBEDDED_PLAYER&cver=20200806&cplayer=UNIPLAYER&cbr=Chrome&cbrver=84.0.4147.105&cos=Windows&cosver=10.0&autoplay=1&hl=es_US&cr=AR&uga=f40&len=113.881&rtn=60&afmt=251&idpj=-3&ldpj=-12&rti=29&muted=0&st=17.075&et=19.174");
      const dataJson = await response.json();
      setData(dataJson.results[0]);
    };
    getTrending();
  }, []);

  return (
    <YouTubeContext.Provider value={{  }}>
      {children}
    </YouTubeContext.Provider>
  );
};

export default YouTubeContext;
export { YouTubeProvider };
