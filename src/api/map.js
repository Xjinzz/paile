var map = new BMap.Map();
var localSearch = new BMap.LocalSearch(map);
export let searchByStationName = (address)=> {
    return new Promise((resolve,reject)=>{
        var keyword = address;
        localSearch.setSearchCompleteCallback(function (searchResult) {
            var poi = searchResult.getPoi(0);
            if(typeof poi === 'undefined'){
              
                // let longitude = poi.point.lng;
                // let latitude  = poi.point.lat;
                reject('请输入正确的地址')
               
            }else{
                resolve(poi)
            }
        });
        localSearch.search(keyword);
    })

} 