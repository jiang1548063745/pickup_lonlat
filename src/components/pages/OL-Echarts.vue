<template>
  <div id="mapContainer">
  </div>
</template>

<script>
import CustomLayers from '../../lib/CustomLayers'
import * as proj from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'
import EChartsLayer from 'ol-echarts'
import rawData from './data'
import echarts from 'echarts'

export default {
  data () {
    return {
      lonlat: [],
      map: {
        moveEvtKey: null,
        clickEvtKey: null,
        overlay: null,
        baseLayer: CustomLayers.GrayStreetLayer,
        borderLayer: null,
        zoom: 11,
        mapCenter: null,
        mapObj: null
      }
    }
  },
  methods: {
    initMap () {
      let _this = this
      this.map.mapCenter = proj.transform([116.55406673632812, 39.94828066015626],
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
    addEchartsLayer () {
      let hStep = 300 / (rawData.length - 1)
      let busLines = [].concat.apply([], rawData.map(function (busLine, idx) {
        let prevPt
        let points = []
        for (let i = 0; i < busLine.length; i += 2) {
          let pt = [busLine[i], busLine[i + 1]]
          if (i > 0) {
            pt = [
              prevPt[0] + pt[0],
              prevPt[1] + pt[1]
            ]
          }
          prevPt = pt

          points.push([pt[0] / 1e4, pt[1] / 1e4])
        }
        return {
          'coords': points,
          'lineStyle': {
            'normal': {
              'color': echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
            }
          }
        }
      }))

      let option = {
        'series': [
          {
            'type': 'lines',
            'polyline': true,
            'data': busLines,
            'lineStyle': {
              'normal': {
                'width': 0
              }
            },
            'effect': {
              'constantSpeed': 20,
              'show': true,
              'trailLength': 0.5,
              'symbolSize': 1.5
            },
            'zlevel': 1
          }
        ]
      }

      let echartslayer = new EChartsLayer(option, {
        stopEvent: false,
        hideOnMoving: false,
        hideOnZooming: false,
        forcedPrecomposeRerender: true
      })

      echartslayer.appendTo(this.map.mapObj)
    }
  },
  mounted () {
    this.initMap()
    // this.addEchartsLayer()
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
