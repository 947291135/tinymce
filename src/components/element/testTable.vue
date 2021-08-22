<!--
 *@description:
 *@author: Ming
 *@date: 2021-08-22 15:04:01
 *@version: V1.0.5
-->
<template>
  <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="subClassName"
          :label="item.subClassName"
          min-width="100"
          :key="index"
          align="center"
          v-for="(item,index) of list">
          <el-table-column
            v-for="(attrItem,attrIndex) of item.attrList"
            :key="index+'-'+attrIndex"
            align="center"
            :label="attrItem.attrName">
            <template slot-scope="scope">
              {{scope.row[item.id].attrValueMap[attrItem.attrId]}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  props: {

  },
  components: {

  },
  data () {
    return {
      list: [],
      tableData: []
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.getData()
  },
  mounted () {

  },
  methods: {
    getData () {
      let res = {
        'goodsSubClassesVoList': [
          {
            'id': '504679147042242560',
            'goodsId': '504679147000299520',
            'goodsCode': 'GZG01B001C000220210812001',
            'subClassType': 2,
            'subClassName': '交强险',
            'attrList': [
              {
                'id': '504679147100962816',
                'goodsId': '504679147000299520',
                'attrId': '498549305930428416',
                'attrValueIds': '498549305930428417',
                'subClassId': '504679147042242560',
                'attrValueList': [
                  {
                    'id': '498549305930428417',
                    'attrId': '498549305930428416',
                    'attrName': '险种',
                    'attrValueName': '交强险',
                    'relationId': '',
                    'valueSort': 0
                  },
                  {
                    'id': '498549305930428418',
                    'attrId': '498549305930428416',
                    'attrName': '险种',
                    'attrValueName': '商业险',
                    'relationId': '',
                    'valueSort': 1
                  }
                ],
                'attrName': '险种',
                'attrValueName': '交强险',
                'unit': '',
                'inputMode': 1
              }
            ],
            'goodsSalesList': [
              {
                'id': '504679147113545728',
                'salesCode': 'GZG01B001C000220210812001_001',
                'goodsId': '504679147000299520',
                'dvgId': '',
                'dvgCode': '',
                'dvgName': '',
                'imgUrl': '',
                'finishedProductId': '',
                'subClassId': '504679147042242560',
                'adjustNum': 0,
                'frozenNum': 0,
                'salesNum': 1,
                'goodsSalesProductList': [
                  {
                    'id': '504679147218403328',
                    'goodsId': '504679147000299520',
                    'subClassId': '504679147042242560',
                    'goodsSalesId': '504679147113545728',
                    'dvgId': '',
                    'dvgName': '',
                    'dvgCode': '',
                    'finishedProductId': '0',
                    'skuId': '',
                    'skuCode': 'FW202107210005',
                    'skuName': '',
                    'skuType': 6,
                    'brandName': '',
                    'modelName': ''
                  }
                ],
                'goodsSalesAttributeValueList': [
                  {
                    'id': '504679147247763456',
                    'goodsSalesId': '504679147113545728',
                    'goodsSalesAttrId': '504679147100962816',
                    'attrId': '498549305930428416',
                    'attrName': '险种',
                    'attrValueId': '498549305930428417',
                    'attrValueName': '交强险'
                  }
                ],
                'realNum': '',
                'stockNum': ''
              }
            ],
            'goodsSalesOtherAttributeValueList': [],
            'packageGoodsId': '',
            'parentGoodsName': ''
          },
          {
            'id': '504679147084185600',
            'goodsId': '504679147000299520',
            'goodsCode': 'GZG01B001C000220210812001',
            'subClassType': 2,
            'subClassName': '商业险',
            'attrList': [
              {
                'id': '504679147256152064',
                'goodsId': '504679147000299520',
                'attrId': '498549305930428416',
                'attrValueIds': '498549305930428418',
                'subClassId': '504679147084185600',
                'attrValueList': [
                  {
                    'id': '498549305930428417',
                    'attrId': '498549305930428416',
                    'attrName': '险种',
                    'attrValueName': '交强险',
                    'relationId': '',
                    'valueSort': 0
                  },
                  {
                    'id': '498549305930428418',
                    'attrId': '498549305930428416',
                    'attrName': '险种',
                    'attrValueName': '商业险',
                    'relationId': '',
                    'valueSort': 1
                  }
                ],
                'attrName': '险种',
                'attrValueName': '商业险',
                'unit': '',
                'inputMode': 1
              },
              {
                'id': '504679147256152065',
                'goodsId': '504679147000299520',
                'attrId': '498549942625906688',
                'attrValueIds': '503506533997752320,498549942625906693,498549942625906692',
                'subClassId': '504679147084185600',
                'attrValueList': [
                  {
                    'id': '498549942625906689',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueName': '1万',
                    'relationId': '',
                    'valueSort': 0
                  },
                  {
                    'id': '498549942625906690',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueName': '5万',
                    'relationId': '',
                    'valueSort': 1
                  },
                  {
                    'id': '498549942625906691',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueName': '10万',
                    'relationId': '',
                    'valueSort': 2
                  },
                  {
                    'id': '498549942625906692',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueName': '50万',
                    'relationId': '',
                    'valueSort': 3
                  },
                  {
                    'id': '498549942625906693',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueName': '100万',
                    'relationId': '',
                    'valueSort': 4
                  },
                  {
                    'id': '503506533997752320',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueName': '50万+1万',
                    'relationId': '',
                    'valueSort': 5
                  },
                  {
                    'id': '501048427367772160',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueName': '其他',
                    'relationId': '',
                    'valueSort': 6
                  }
                ],
                'attrName': '保额',
                'attrValueName': '50万+1万,100万,50万',
                'unit': '',
                'inputMode': 1
              }
            ],
            'goodsSalesList': [
              {
                'id': '504679147260346368',
                'salesCode': 'GZG01B001C000220210812001_002',
                'goodsId': '504679147000299520',
                'dvgId': '',
                'dvgCode': '',
                'dvgName': '',
                'imgUrl': '',
                'finishedProductId': '',
                'subClassId': '504679147084185600',
                'adjustNum': 0,
                'frozenNum': 0,
                'salesNum': 1,
                'goodsSalesProductList': [
                  {
                    'id': '504679147402952704',
                    'goodsId': '504679147000299520',
                    'subClassId': '504679147084185600',
                    'goodsSalesId': '504679147260346368',
                    'dvgId': '',
                    'dvgName': '',
                    'dvgCode': '',
                    'finishedProductId': '0',
                    'skuId': '',
                    'skuCode': 'FW202108050003',
                    'skuName': '',
                    'skuType': 6,
                    'brandName': '',
                    'modelName': ''
                  }
                ],
                'goodsSalesAttributeValueList': [
                  {
                    'id': '504679147608473600',
                    'goodsSalesId': '504679147260346368',
                    'goodsSalesAttrId': '504679147256152064',
                    'attrId': '498549305930428416',
                    'attrName': '险种',
                    'attrValueId': '498549305930428418',
                    'attrValueName': '商业险'
                  },
                  {
                    'id': '504679147608473601',
                    'goodsSalesId': '504679147260346368',
                    'goodsSalesAttrId': '504679147256152065',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueId': '498549942625906692',
                    'attrValueName': '50万'
                  }
                ],
                'realNum': '',
                'stockNum': ''
              },
              {
                'id': '504679147402952705',
                'salesCode': 'GZG01B001C000220210812001_003',
                'goodsId': '504679147000299520',
                'dvgId': '',
                'dvgCode': '',
                'dvgName': '',
                'imgUrl': '',
                'finishedProductId': '',
                'subClassId': '504679147084185600',
                'adjustNum': 0,
                'frozenNum': 0,
                'salesNum': 1,
                'goodsSalesProductList': [
                  {
                    'id': '504679147491033088',
                    'goodsId': '504679147000299520',
                    'subClassId': '504679147084185600',
                    'goodsSalesId': '504679147402952705',
                    'dvgId': '',
                    'dvgName': '',
                    'dvgCode': '',
                    'finishedProductId': '0',
                    'skuId': '496279260416319488',
                    'skuCode': 'FW202107200002',
                    'skuName': '第三者责任险100万',
                    'skuType': 6,
                    'brandName': '',
                    'modelName': ''
                  }
                ],
                'goodsSalesAttributeValueList': [
                  {
                    'id': '504679147692359680',
                    'goodsSalesId': '504679147402952705',
                    'goodsSalesAttrId': '504679147256152064',
                    'attrId': '498549305930428416',
                    'attrName': '险种',
                    'attrValueId': '498549305930428418',
                    'attrValueName': '商业险'
                  },
                  {
                    'id': '504679147692359681',
                    'goodsSalesId': '504679147402952705',
                    'goodsSalesAttrId': '504679147256152065',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueId': '498549942625906693',
                    'attrValueName': '100万'
                  }
                ],
                'realNum': '',
                'stockNum': ''
              },
              {
                'id': '504679147491033089',
                'salesCode': 'GZG01B001C000220210812001_004',
                'goodsId': '504679147000299520',
                'dvgId': '',
                'dvgCode': '',
                'dvgName': '',
                'imgUrl': '',
                'finishedProductId': '',
                'subClassId': '504679147084185600',
                'adjustNum': 0,
                'frozenNum': 0,
                'salesNum': 1,
                'goodsSalesProductList': [
                  {
                    'id': '504679147562336256',
                    'goodsId': '504679147000299520',
                    'subClassId': '504679147084185600',
                    'goodsSalesId': '504679147491033089',
                    'dvgId': '',
                    'dvgName': '',
                    'dvgCode': '',
                    'finishedProductId': '0',
                    'skuId': '496278884883505152',
                    'skuCode': 'FW202107200001',
                    'skuName': '第三者责任险50万',
                    'skuType': 6,
                    'brandName': '',
                    'modelName': ''
                  }
                ],
                'goodsSalesAttributeValueList': [
                  {
                    'id': '504679147709136896',
                    'goodsSalesId': '504679147491033089',
                    'goodsSalesAttrId': '504679147256152064',
                    'attrId': '498549305930428416',
                    'attrName': '险种',
                    'attrValueId': '498549305930428418',
                    'attrValueName': '商业险'
                  },
                  {
                    'id': '504679147709136897',
                    'goodsSalesId': '504679147491033089',
                    'goodsSalesAttrId': '504679147256152065',
                    'attrId': '498549942625906688',
                    'attrName': '保额',
                    'attrValueId': '503506533997752320',
                    'attrValueName': '50万+1万'
                  }
                ],
                'realNum': '',
                'stockNum': ''
              }
            ],
            'goodsSalesOtherAttributeValueList': [],
            'packageGoodsId': '',
            'parentGoodsName': ''
          }
        ]
      }
      this.list = res.goodsSubClassesVoList
      this.getTableData(res.goodsSubClassesVoList)
    },
    getTableData (list) {
      if (!list || !list.length) return
      let obj = {}
      list.forEach(item => {
        if (item && item.id) {
          obj[item.id] = item.goodsSalesList.map(item => {
            let attrValueMap = {}
            item.goodsSalesAttributeValueList.forEach(items => {
              attrValueMap[items.attrId] = items.attrValueName
            })
            return {
              attrValueMap
            }
          })
        }
      })
      this.tableData = this.descartes(obj)
    },
    descartes (list) {
      // parent上一级索引;count指针计数
      var point = {}
      var result = []
      var pIndex = null
      var tempCount = 0
      let obj = {}
      // 根据参数列生成指针对象
      for (var index in list) {
        if (typeof list[index] === 'object') {
          point[index] = {
            'parent': pIndex,
            'count': 0
          }
          pIndex = index
        }
      }
      // 单维度数据结构直接返回
      if (pIndex === null) {
        return list
      }
      // 动态生成笛卡尔积
      while (true) {
        for (let index in list) {
          tempCount = point[index]['count']
          obj[index] = list[index][tempCount]
        }
        // 压入结果数组
        result.push(obj)
        obj = {}
        // 检查指针最大值问题
        while (true) {
          if (point[index]['count'] + 1 >= list[index].length) {
            point[index]['count'] = 0
            pIndex = point[index]['parent']
            if (pIndex === null) {
              return result
            }
            // 赋值parent进行再次检查
            index = pIndex
          } else {
            point[index]['count']++
            break
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
