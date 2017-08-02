import React from 'react'
import echarts from 'echarts'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button } from 'antd'

const colProps = {
  lg: 12,
  md: 24,
}
const data1 = [
  {name:'淮河流域',value:134},
  {name:'海河流域',value:24},
  {name:'黄河流域',value:38},
  {name:'长江流域',value:46},
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
        title: { text: '各流域河流数量占比',bottom:'0px',left:'50%'},
        tooltip: {
          trigger:'item',
          formatter:"{a} <br/>{b} : {c} ({d}%)"
        },
        legend:{
          orient:'vertical',
          left:'right',
          top:'50px',
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
      height:300
    }}></div>
  }
})

const PieChart = () => (
  <div className="content-inner" style={{marginLeft:'28%'}}> 
    <SimplePieChart1/>
  </div>
)

export default PieChart
