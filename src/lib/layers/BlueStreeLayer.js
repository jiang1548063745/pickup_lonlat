import * as olproj from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import TileGrid from 'ol/tilegrid/TileGrid'
import TileImage from 'ol/source/TileImage'

// 坐标系
let projection = olproj.get('EPSG:3857')

// 分辨率
let resolutions = [
  156543.03392800014,
  78271.51696399994,
  39135.75848200009,
  19567.87924099992,
  9783.93962049996,
  4891.96981024998,
  2445.98490512499,
  1222.992452562495,
  611.4962262813797,
  305.74811314055756,
  152.87405657041106,
  76.43702828507324,
  38.21851414253662,
  19.10925707126831,
  9.554628535634155,
  4.77731426794937,
  2.388657133974685
]

// 贴图组
let tilegrid = new TileGrid({
  origin: [-2.0037508342787E7, 2.0037508342787E7],
  resolutions: resolutions,
  tileSize: 256
})

let source = new TileImage({
  projection: projection,
  tileGrid: tilegrid,
  tileUrlFunction: function (tileCoord, pixelRatio, proj) {
    if (!tileCoord) {
      return ''
    }
    let z = tileCoord[0]
    let x = Math.abs(tileCoord[1])
    let y = Math.abs(tileCoord[2]) - 1
    return (
      'http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/' + z + '/' + y + '/' + x
    )
  }
})

const BlueStreetLayer = new TileLayer({
  source: source
})

export default BlueStreetLayer
