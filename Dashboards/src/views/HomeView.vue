<template>
  <div class="container">
    <span class="animate__animated animate__fadeIn">
      <h5 class="card-title">Dashboard</h5>
      <h6 class="card-text">Bem-vindo ao Dashboard de Produtos do Estoque.</h6>
      <div class="row">
        <div class="col-3">
          <select class="form-select" v-model="selectedItems">
            <option v-for="item in items" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="row mt-4 justify-content-end">
        <div class="col-auto kpi-card green-gradient">
          <span class="card-text">Nível de Estoque Atual</span>
          <span class="card-value text-center">Qtd. 53.000</span>
          <i class="fas fa-shopping-cart icon"></i>
        </div>


        <div class="col-auto kpi-card purple-gradient">
          <span class="card-text">Giro de Estoque Mensal</span>
          <span class="card-value text-center">2,5 vezes</span>
          <i class="fas fa-shopping-cart icon"></i>
        </div>

        <div class="col-auto kpi-card red-gradient">
          <span class="card-text">Taxa de Ruptura</span>
          <span class="card-value text-center">6,54% </span>
          <i class="fas fa-shopping-cart icon"></i>
        </div>
      </div>
      <div class="row mt-4 justify-content-center">
        <div class="col-8 p-1">
          <div class="col-12">
            <div class="card-estilizado">
              <h6 class="card-title text-center">Estoque minimo de produtos no armazém</h6>
              <div id="chart4" style="height:300px;"></div>
            </div>
          </div>
          <div class="col-12">
            <div class="card-estilizado">
              <h6 class="card-title text-center">Produtos no armazém e percentual</h6>
              <div id="chart2" style="height:300px;"></div>
            </div>
          </div>
        </div>
        <div class="col-4 p-1">
          <div class="col-12">
            <div class="card-estilizado">
              <h6 class="card-title text-center">Produtos em maior quantidade no estoque</h6>
              <div id="chart5" style="height:640px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-aligm-center">
        <div class="col-6 p-1">
          <div class="card-estilizado">
            <h6 class="card-title text-center">Entrada e sáida do armazém</h6>
            <div id="chart3" style="height:300px;"></div>
          </div>
        </div>
        <div class="col-6 p-1">
          <div class="card-estilizado">
            <h6 class="card-title text-center">Entrada e sáida do armazém</h6>
            <div id="chart1" style="height:300px;"></div>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<style>
.icon {
  float: right;
  font-size: 500%;
  position: relative;
  top: 0rem;
  right: -0.3rem;
  opacity: .16;
}

.red-gradient {
  background-color: #fdb67f;
  background-image: linear-gradient(160deg, #fdb67f 0%, #cd5252 100%);
  color: #fff;
}

.purple-gradient {
  background-color: #80D0C7;
  background-image: linear-gradient(160deg, #80D0C7 0%, #886ab5 100%);
  color: #fff;
}

.green-gradient {
  background-color: #7ffdd6;
  background-image: linear-gradient(160deg, #7ffdd6 0%, #99cd52 100%);
  color: #fff;
}

.kpi-card {
  overflow: hidden;
  position: relative;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.1);
  ;
  display: inline-block;
  padding: 1em;
  border-radius: 0.8em;
  font-family: sans-serif;
  min-width: 180px;
  margin-left: 0.5em;
  margin-top: 0.5em;
}

.card-value {
  display: block;
  font-size: 200%;
  font-weight: bolder;
}

.card-text {
  display: block;
  font-size: 70%;
  padding-left: 0.2em;
}
</style>

<script>
import * as echarts from 'echarts';

export default {
  name: 'HomeView',
  data() {
    return {
      selectedItems: 'Selecione um Armazém',
      items: ['Selecione um Armazém', 'Armazém 1', 'Armazém 2', 'Armazém 3', 'Armazém 4']
    };
  },
  mounted() {
    const chart1 = echarts.init(document.getElementById('chart1'));
    chart1.setOption({
      tooltip: {},
      legend: {},
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E', 'Produto F', 'Produto G']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Entrada',
          data: [400, 600, 750, 480, 470, 510, 630],
          type: 'line',
          areaStyle: {},
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyRoundRect',
          symbolSize: 10,
        },
        {
          name: 'Saída',
          data: [300, 200, 550, 380, 430, 200, 530],
          type: 'line',
          areaStyle: {},
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 10,
        }
      ]
    });

    const chart2 = echarts.init(document.getElementById('chart2'));
    chart2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: 'Produtos',
          type: 'pie',
          radius: ['40%', '60%'],
          labelLine: {
            length: 30
          },
          label: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#F6F8FC',
            borderColor: '#8C8D8E',
            borderWidth: 1,
            borderRadius: 10,
            rich: {
              a: {
                color: '#6E7079',
                lineHeight: 15,
                align: 'center'
              },
              hr: {
                borderColor: '#8C8D8E',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 25
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 3],
                borderRadius: 4
              }
            }
          },
          data: [
            { value: 1048, name: 'Produto A' },
            { value: 335, name: 'Produto B' },
            { value: 310, name: 'Produto D' },
            { value: 251, name: 'Produto G' },
            { value: 234, name: 'Produto F' },
            { value: 147, name: 'Produto C' },
            { value: 135, name: 'Produto E' },
            { value: 2000, name: 'Outros' }
          ]
        }
      ]
    });

    const chart3 = echarts.init(document.getElementById('chart3'));
    chart3.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E', 'Produto F', 'Produto G']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Saída',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series',
          },
          itemStyle: {
            color: 'rgba(255, 0, 0, .7)',
          },
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bolder',
          },
          data: [400, 200, 750, 480, 470, 510, 630]
        },
        {
          name: 'Em estoque',
          type: 'bar',
          stack: 'Ad',
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: 'rgba(100, 255, 100, .7)',
          },
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bolder',
          },
          data: [100, 400, 191, 234, 290, 330, 310]
        },
      ]
    });

    const chart4 = echarts.init(document.getElementById('chart4'));
    chart4.setOption({
      tooltip: {},
      legend: {},
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,
          end: 30,
          xAxisIndex: [0, 5]
        },
        {
          type: 'inside',
          realtime: true,
          start: 0,
          end: 30,
          xAxisIndex: [0, 5]
        }
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true,
        height: '80%',
      },
      xAxis: {
        type: 'category',
        data: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E', 'Produto F', 'Produto G', 'Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E', 'Produto F', 'Produto G', 'Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E', 'Produto F', 'Produto G']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Estoque Minimo',
          itemStyle: {
            color: 'rgba(255, 0, 0, .7)',
          },
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bolder',
          },
          data: [400, 600, 750, 480, 470, 510, 630, 400, 600, 750, 480, 470, 510, 630, 400, 600, 750, 480, 470, 510, 630],
          type: 'bar',
        },
        {
          name: 'Em Estoque',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: [900, 1200, 1350, 880, 930, 2000, 790, 900, 1200, 1350, 880, 930, 2000, 790, 900, 1200, 1350, 880, 930, 2000, 790],
          type: 'line'
        }
      ]
    });

    const chart5 = echarts.init(document.getElementById('chart5'));
    chart5.setOption({
      tooltip: {},
      legend: {},
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'category',
        data: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E', 'Produto F', 'Produto G']
      },
      xAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Entrada',
          itemStyle: {
            color: 'rgba(8, 63, 70, .8)',
          },
          label: {
            show: true,
            fontSize: 12,
            position: 'outside',
          },
          data: [27, 390, 415, 420, 470, 510, 630],
          type: 'bar',
        },
      ]
    });
  },
}
</script>