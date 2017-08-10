import React from 'react'
import {connect} from 'dva'
//import props from
import {Table,Layout,Tree,Button} from 'antd'
import TableTitle from '../../../../components/Common/TableTitle'
import coStyle from '../../../common.less'
import styles from '../../index.less'
import {HNCity} from '../../../../utils/city'

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
const Table1 = ({baseSituation,dispatch})=>{
    //console.log(baseSituation)
    const {table1,loading,table1ExcelUrl} = baseSituation
    const columns=[{
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
                obj.props.colSpan=2
            }
            return obj;
          }
        },{
            title:'所在流域',
            key:'所在流域',
            dataIndex:'所在流域',
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
        },{
            title:'条数',
            key:'条数',
            dataIndex:'条数',
            width:100,
        },{
            title:'所占百分比',
            key:'所占百分比',
            dataIndex:'所占百分比',
            width:100,
            render:(text)=>`${text}`
        },{
            title:'总河长(Km)',
            key:'总河长',
            dataIndex:'总河长',
            width:100,
        }
    ]
    const exportProps={
    
        type:"primary",
        onClick(e,d){
            dispatch({type:'baseSituation/exportExcel',payload:'table1'});
        }
    }
    const tableProps={
        title:()=><TableTitle text={`河南省河流流域面积在200~3000平方公里河流汇总表（按流域划分）`} />,
        bordered:true,
        pagination:false,
        dataSource:proDs(table1.ds),
        columns:columns,
        size:'small',
        loading:loading
    }
    return(
        <div className={coStyle.table}  style={{/*width:'700px',marginLeft:'100px'*/}}>
            <div className={styles.export}>
                <Button {...exportProps}>导出</Button>
            </div>
            <Table {...tableProps}></Table>
        </div>
    )
}
//export default Table1
//因为两个表一样，所有使用同一个model
export default connect(
    ({baseSituation})=>({baseSituation})
)(Table1);