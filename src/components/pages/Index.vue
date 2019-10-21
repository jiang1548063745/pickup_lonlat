<template>
  <div id="mapContainer">
    <img id="overlay" src="https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png" style="width: 19px; height: 33px; top: 0px; left: 0px;">
    <div class="tool-box">
      <div class="box-header">
        <h5 class="title">坐标拾取(EPSG:3857)</h5>
      </div>
      <div style="margin-top: 20px">
        <div class="row">
          <span class="col-sm-2 input-group-addon" style="margin-left: 10px">Lon:</span>
          <div class="col-sm-9">
            <input type="text" v-model="lonlat[0]" class="form-control" id="lon" placeholder="">
          </div>
        </div>
        <div class="row" style="margin-top: 10px">
          <span for="lat" class="col-sm-2 control-label" style="margin-left: 10px">Lat:</span>
          <div class="col-sm-9">
            <input type="text" v-model="lonlat[1]" class="form-control" id="lat" placeholder="">
          </div>
        </div>
        <button type="" @click="addMapEvt" class="btn btn-primary" style="display: block; margin-top: 10px; margin-left: auto; margin-right: auto">
          点击拾取坐标
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomLayers from '../../lib/CustomLayers'
import * as proj from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import GeoJSON from 'ol/format/GeoJSON'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Overlay from 'ol/Overlay'
import {unByKey} from 'ol/Observable'

export default {
  name: 'Index',
  data () {
    return {
      lonlat: [],
      map: {
        moveEvtKey: null,
        clickEvtKey: null,
        overlay: null,
        baseLayer: CustomLayers.CommLayer,
        borderLayer: null,
        zoom: 13,
        mapCenter: null,
        mapObj: null
      }
    }
  },
  methods: {
    addMapEvt () {
      let _this = this
      this.map.moveEvtKey = this.map.mapObj.on('pointermove', (e) => {
        _this.map.overlay.setPosition(e.coordinate)
      })

      this.map.clickEvtKey = this.map.mapObj.on('click', (e) => {
        _this.map.overlay.setPosition(e.coordinate)
        _this.lonlat = proj.toLonLat(e.coordinate)
        unByKey(_this.map.moveEvtKey)
        unByKey(_this.map.clickEvtKey)
        _this.map.moveEvtKey = null
        _this.map.clickEvtKey = null
      })
    },
    initMap () {
      let _this = this
      this.map.mapCenter = proj.transform([114.30878471, 30.591228],
        'EPSG:4326',
        // 正式
        'EPSG:3857')

      this.map.mapObj = new Map({
        target: 'mapContainer',
        layers: [
          CustomLayers.CommLayer
        ],
        view: new View({
          center: _this.map.mapCenter,
          zoom: _this.map.zoom,
          maxZoom: 17,
          minZoom: 9.2
        }),
        controls: []
      })
    },
    addBorder () {
      this.map.borderLayer = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: '../../../static/json/wh_border.json'
        }),
        style: () => {
          return new Style({
            stroke: new Stroke({
              color: '#3cb1ff',
              width: 2
            })
          })
        }
      })

      this.map.mapObj.addLayer(this.map.borderLayer)
    },
    addOverlay () {
      this.map.overlay = new Overlay({
        element: document.getElementById('overlay'),
        positioning: 'bottom-center',
        stopEvent: false
      })
      this.map.overlay.setPosition(proj.transform([114.30878471, 30.591228], 'EPSG:4326', 'EPSG:3857'))
      this.map.mapObj.addOverlay(this.map.overlay)
    }
  },
  mounted () {
    this.initMap()
    this.addBorder()
    this.addOverlay()
    this.addMapEvt()
  }
}
</script>

<style scoped>
#mapContainer {
  height: calc(100vh);
  width: 100%;
}
.tool-box {
  width: 250px;
  height: 210px;
  position: absolute;
  color: rgba(0,0,0,0.65);
  background-color: #FDFDFE;
  z-index: 99;
  margin-top: 20px;
  margin-left: 80%;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: border-box;
}
.box-header {
  height: 40px;
  border-bottom: 1px solid #e8e8e8;
}
.title {
  display: inline-block;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  padding: 9px 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #0d1a26;
  font-weight: 500;
  font-family: Avenir,-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol',sans-serif;
}
</style>
