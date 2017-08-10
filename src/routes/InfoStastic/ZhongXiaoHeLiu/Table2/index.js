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
        if(ds.data&&ds.data.length>0){
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
const Table2 = ({baseSituation,dispatch})=>{
    const {table2,loading} = baseSituation
    const columns=[{
          title:'序号',
          key:'序号',
          dataIndex:'序号',
          /*width:10,*/
          render:(text,record,index)=>{
            let obj={
                children:text,
                props:{}
            }
            if(index==0){
                obj.props.colSpan=2
                //console.log(obj)
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
            title:'河流条数',
            children:[
                {
                    title:'总计',key:'总计',dataIndex:'总计河流条数',widht:50,
                },{
                    title:'已治理河流数(条)',key:'已治理河流数',dataIndex:'已治理河流数',/*width:80,*/
                },{
                    title:'已治理项目数(个)',key:'已治理项目数',dataIndex:'已治理项目数',/*width:80,*/
                },
            ]
        },{
            title:'总河长(Km)',
            key:'总河长',
            dataIndex:'总河长',
            /*width:100,*/
        },{
            title:'200~3000平方公里已治理河流总长(Km)',
            key:'已治理长度',
            dataIndex:'已治理长度',
            width:150,
        },{
            title:'已治理河长占总河长的比例',
            key:'已治理河长占总河长的比例',
            dataIndex:'已治理河长占总河长的比例',
            /*width:150,*/
            render:(text)=>`${text}`
        },{
            title:'200~3000平方公里河流未治理长度(Km)',
            key:'未治理长度',
            dataIndex:'未治理长度',
            width:150,
        }
    ]
    
   const exportProps={
        type:"primary",
        onClick(e,d){
            dispatch({type:'baseSituation/exportExcel',payload:'table2'});
        }
    }
    const tableProps={
        title:()=><TableTitle text={`河南省河流流域面积在200~3000平方公里河流治理情况统计表（按流域汇总）`} />,
        bordered:true,
        pagination:false,
        dataSource:proDs(table2.ds),
        columns:columns,
        loading:loading,
    }
    return(
       <div className={coStyle.table}>
        <div className={styles.export}>
            <Button type="primary" {...exportProps}>导出</Button>
        </div>
        
        <Table  {...tableProps}/>
    </div>
    )
}

export default connect(
    ({baseSituation})=>({baseSituation})
) (Table2);