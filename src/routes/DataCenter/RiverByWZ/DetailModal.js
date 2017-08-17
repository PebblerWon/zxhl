import React from 'react'
import { Modal, Button ,Table,Card,Row,Col,Form,Collapse,Carousel} from 'antd';

import img1 from '../../../assets/7查询信息-中小河流-河流详细信息.jpg'
import styles from './RiverDetail.less'

const FormItem = Form.Item;
const Panel = Collapse.Panel
const DetailModal=({visible,maskClosable,onOk,onCancel,item})=>{
  //console.log(item)
  //console.log(columns)
  const columns = ['编码','河流名称','所属流域','所在水系','河流长度','流域面积','治理项目','规划项目']
  const modalProps = {visible,maskClosable,onOk,onCancel}
 
  const formItemLayout={
    labelCol:{span:12},
    wrapperCol:{span:12},
  }
  const textInfo = [];
  for(let i = 0;i<columns.length;i++){
    let title = columns[i]
    let dataIndex = columns[i]
    if(item[dataIndex]){
      textInfo.push(
          <Col span={6} key={title}>
            <FormItem {...formItemLayout} label={`${title}:`}>{item[dataIndex]}</FormItem>
          </Col>
        )
    }
  }
  textInfo.push(
          <Col span={24} key='流经地'>
            <FormItem labelCol={{span:3}} wrapperCol={{span:21}} label={`流经地:`}>
              {item['流经地']}
            </FormItem>
          </Col>
  )
    return (
      <div>
        <Modal
          title={`${item['河流名称']}详细信息`}
          {...modalProps}
          width={'900px'}
          className={styles.modal}
        >
          <Row>
            {textInfo}
          </Row>
        </Modal>
      </div>
    );
}

export default DetailModal;
