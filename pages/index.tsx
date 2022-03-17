import type { NextPage } from 'next'

const Home: NextPage = () => {
  const createMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.4798477003537, 126.895318461208),
      level: 4
    };
    return new window.kakao.maps.Map(container, options);  
  }

  const coords = [
    [37.480203474768, 126.894268431425],
    [37.4811291019439, 126.895303784633],
    [37.4797537407561, 126.896050536592],
    [37.4809950309438, 126.89653011741]
  ].sort((a, b) => {
    const aSum = a[0] + a[1]
    const bSum = b[0] + b[1]
    if(aSum > bSum) {
      return 1
    } else if(aSum < bSum) {
      return -1
    } else {
      return 0
    }
  })

  const drawPolygon = (map: any) => {
    const polygonPath = coords.map(coord => new window.kakao.maps.LatLng(...coord)) 

    // 지도에 표시할 다각형을 생성합니다
    const polygon = new window.kakao.maps.Polygon({
      path:polygonPath, // 그려질 다각형의 좌표 배열입니다
      strokeWeight: 3, // 선의 두께입니다
      strokeColor: '#473afd', // 선의 색깔입니다
      strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'longdash', // 선의 스타일입니다
      fillColor: '#473afd', // 채우기 색깔입니다
      fillOpacity: 0.7 // 채우기 불투명도 입니다
    });

    // 지도에 다각형을 표시합니다
    polygon.setMap(map);
  }

  const handleAddrToCoordResponse = function(result: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
        console.log(result[0].x, result[0].y);
    }
  };

  const handleCoord2AddrResponse = function(result: any, status: any) {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log(result[0].address.address_name);
    }
  };

  if (typeof window !== 'undefined') {
    window.kakao.maps.load(function() {
      const geocoder = new window.kakao.maps.services.Geocoder();
  
      const coord = new window.kakao.maps.LatLng(37.56496830314491, 126.93990862062978);
      geocoder.coord2Address(coord.getLng(), coord.getLat(), handleCoord2AddrResponse);

      geocoder.addressSearch('서울 구로구 디지털로32가길 98', handleAddrToCoordResponse);
      geocoder.addressSearch('서울 구로구 남부순환로107길 24', handleAddrToCoordResponse);
      geocoder.addressSearch('서울 구로구 디지털로26길 30', handleAddrToCoordResponse);
      geocoder.addressSearch('서울 구로구 디지털로26길 61', handleAddrToCoordResponse);
      geocoder.addressSearch('서울 구로구 시흥대로161길 50 신성미소지움상가 105호', handleAddrToCoordResponse);
      geocoder.addressSearch('서울 구로구 디지털로26길 72', handleAddrToCoordResponse);

      
      const map = createMap()
      drawPolygon(map)
    });
  }
 
  return (
    <main>
      <div id="map" className="kakao-map-root"></div>
    
    </main>
  )
}

export default Home
