import React from 'react'
import echarts from 'echarts'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button } from 'antd'

const colProps = {
  lg: 12,
  md: 24,
}
const data1 = [
  {name:'淮河流域',value:225},
  {name:'海河流域',value:36},
  {name:'黄河流域',value:58},
  {name:'长江流域',value:78},
]
const data2 = [
  {name:'郑州市',value:25},
  {name:'开封市',value:19},
  {name:'洛阳市',value:27},
  {name:'平顶山市',value:11},
  {name:'安阳市',value:18},
  {name:'鹤壁市',value:9},
  {name:'新乡市',value:20},
  {name:'焦作市',value:22},
]
const SimplePieChart1 = React.createClass({
  getInitialState(){
    return{
      id:'SimplePieChart1'
    }
  },
  componentDidMount(){
    this.showChart()
  },
  showChart(){
    let myChart = echarts.init(document.getElementById(this.state.id));
    // 绘制图表
    myChart.setOption({
        title: { text: '各流域项目个数占比' },
        tooltip: {
          trigger:'item',
          formatter:"{a} <br/>{b} : {c} ({d}%)"
        },
        legend:{
          orient:'vertical',
          left:'right',
          data:data1.map((item)=>item.name)
        },
        series: [{
            name: '所占比例',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:data1,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });
  },
  render(){
    return <div id={this.state.id} style={{
      width:500,
      height:500
    }}></div>
  }
})

const SimplePieChart2 = React.createClass({
  getInitialState(){
    return{
      id:'SimplePieChart2'
    }
  },
  componentDidMount(){
    this.showChart()
  },
  showChart(){
    let myChart = echarts.init(document.getElementById(this.state.id));
    // 绘制图表
    myChart.setOption({
        title: { text: '各行政区域项目个数占比' },
        tooltip: {
          trigger:'item',
          formatter:"{a} <br/>{b} : {c} ({d}%)"
        },
        legend:{
          orient:'vertical',
          left:'right',
          data:data2.map((item)=>item.name)
        },
        series: [{
            name: '所占比例',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:data2,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    });
  },
  render(){
    console.log(this)
    return <div id={this.state.id} style={{
      width:500,
      height:500
    }}></div>
  }
})

const LineChartC = () => (
  <div className="content-inner"> 
    <Row gutter={32}>
      <Col {...colProps}>
        <Card title="各流域项目个数占比">
          <SimplePieChart1/>
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="各行政区域项目个数占比">
          <SimplePieChart2/>
        </Card>
      </Col>
    </Row>
  </div>
)

export default LineChartC
