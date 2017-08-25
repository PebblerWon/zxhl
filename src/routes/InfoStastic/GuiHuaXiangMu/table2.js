import React from 'react'
import classnames from 'classnames'
import TableTitle from '../../../components/Common/TableTitle'
import {Table,Button} from 'antd'
import conStyle from '../../common.less'
import styles from './index.less'

const proDs = (ds)=>{
        let dataSource=[];
        if(ds&&ds.total){
            dataSource.push({
                '序号':'合计',
                'key':'total',
                ...ds.total
            })
        }
        if(ds&&ds.data&&ds.data.length>0){
            ds.data.map((item,index)=>{
                dataSource.push({
                    '序号':index+1,
                    key:`data${index}`,
                    ...item
                })
            })
        }
        return dataSource;
}


const Table2 = ({dataSource,exportProps,loading})=>{
    const columns=[
        {
          title:'序号',
          key:'序号',
          dataIndex:'序号',
          width:50,
          render:(text,record,index)=>{
            let obj={
                children:text,
                props:{}
            }
            if(index==0){
                obj.props.colSpan=4
            }
            return obj;
          }
        },
        {
            title:'项目名称',
            key:'项目名称',
            dataIndex:'项目名称',
            width:100,
            render:(text,record,index)=>{
                let obj={
                    children:text,
                    props:{}
                }
                if(index==0){
                    obj.props.colSpan=0
                }
                return obj;
            }
        },
        {
            title:'地级行政区',
            key:'地级行政区',
            dataIndex:'地级行政区',
            width:100,
            render:(text,record,index)=>{
                let obj={
                    children:text,
                    props:{}
                }
                if(index==0){
                    obj.props.colSpan=0
                }
                return obj;
            }
        },
        {
            title:'县级行政区',
            key:'县级行政区',
            dataIndex:'县级行政区',
            width:100,
            render:(text,record,index)=>{
                let obj={
                    children:text,
                    props:{}
                }
                if(index==0){
                    obj.props.colSpan=0
                }
                return obj;
            }
        },
        {
            title:'备案长度(Km)',
            key:'备案长度',
            dataIndex:'备案长度',
            width:100,
        },
        {
            title:'批复投资(万元)',
            key:'批复投资',
            dataIndex:'批复投资',
            width:100,
        }
    ]
    const tableProps={
        title:()=><TableTitle text={`河南省2017年申报投资中小河流治理项目名录`} />,
        bordered:true,
        pagination:false,
        dataSource:proDs(dataSource),
        scroll:{y:true},
        columns:columns,
        size:'small',
        loading:loading
    }
    return(
        <div className={classnames(
                {[conStyle.table]:true,[styles.table]:true}
            )}>
            <div className={styles.export}>
                <Button {...exportProps}>导出</Button>
            </div>
            <Table {...tableProps}></Table>
        </div>
    )
}

export default Table2;