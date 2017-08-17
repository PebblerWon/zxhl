import React from 'react'
import { Modal, Button ,Table,Card,Row,Col,Form,Collapse,Carousel} from 'antd';

import styles from './RiverDetail.less'

const FormItem = Form.Item;
const Panel = Collapse.Panel
const RiverDetail=({visible,maskClosable,onOk,onCancel})=>{
	//console.log(item)
 const columns = [
    { title: '编码',  dataIndex: '编码', key: '编码',width:50, },
      { title: '河流名称',  dataIndex: '河流名称', key: '河流名称'},
    { title: '所属流域',  dataIndex: '所属流域', key: '所属流域' },
    { title: '所在水系', dataIndex: '所在水系', key: '所在水系', },
    { title: '河流长度(Km)', dataIndex: '河流长度', key: '河流长度',width:120 },
    { title: '治理项目', dataIndex: '治理项目', key: '治理项目',width:100, },
    { title: '规划项目', dataIndex: '规划项目', key: '规划项目', width:100,},
    { title: '流经地', dataIndex: '流经地', key: '流经地',width:200, }
  ];
  const item={
      '编码':Math.floor(Math.random()*100),
      '河流名称': `东沙河`,
      '所属流域': `黄河流域`,
      '所在水系': `所属流域`,
      '河流长度':31.60,
      '治理项目':20,
      '规划项目':30,
      '流经地':'商丘市梁园区、虞城县、夏邑县、永城县',
      '流域面积':1000
  }
	const modalProps = {visible,maskClosable,onOk,onCancel}
	const showModal = () => {

	}
	const handleOk = (e) => {

	}
	const handleCancel = (e) => {

	}
  const formItemLayout={
    labelCol:{span:12},
    wrapperCol:{span:12},
    style:{
      "fontSize":"16px",
      "marginBottom":"5px"
    },
  }
  const textInfo = [];
  for(let i = 0;i<columns.length;i++){
    let title = columns[i].title
    let dataIndex = columns[i].dataIndex
    if(item[dataIndex]){
      textInfo.push(
          <Col span={12} key={Math.random(0,1)}>
            <FormItem {...formItemLayout} label={`${title}:`}>{item[dataIndex]}</FormItem>
          </Col>
        )
    }
  }
  const picInfo = [];
  const picUrl = [
    "http://tse2.mm.bing.net/th?id=OIP.fkXTL7VA58-qGHL9Y76ctAD5D6&pid=15.1",
    "http://tse3.mm.bing.net/th?id=OIP.I7rLEI8ZFdJMap0t0cOuBQEsEh&pid=15.1",
    "http://a4.att.hudong.com/16/26/19300131134329132102266261316_950.jpg"
  ]
  for(let i = 0;i<picUrl.length;i++){
    picInfo.push(
        <div  key={picUrl[i]}>
          <img src={picUrl[i]} alt="" style={{margin:"0 auto"}}/>
        </div>
      )
  }
    return (
      <div>
        <Modal
          title={`${item['河流名称']}详细信息`}
          {...modalProps}
          width={'700px'}
          style={{width:'700px'}}
        >
          
          <Collapse defaultActiveKey={['1']} accordion>
            <Panel header="属性信息" key="textInfo">
              <Row>
                {textInfo}
              </Row>
            </Panel>
            <Panel header="照片及视频" key="picInfo">
              <Carousel autoplay arrows={true} className={styles.carousel}>
                {picInfo}
              </Carousel>
            </Panel>
            <Panel header="空间位置" key="spaceInfo" className={styles.spaceInfo}>
              <iframe src="http://ditu.amap.com/" >
              </iframe>
            </Panel>
          </Collapse>
        </Modal>
      </div>
    );
}

export default RiverDetail;
