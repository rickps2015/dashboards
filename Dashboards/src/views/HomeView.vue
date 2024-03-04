<template>
  <div class="container">
    <h5 class="card-title">Dashboard</h5>
    <p class="card-text">Bem-vindo ao Dashboard de Produtos.</p>
    <div class="row">
      <div class="col-3">
        <select class="form-select" v-model="selectedItems">
          <option v-for="item in items" :key="item" :value="item">{{ item }}</option>
        </select>
      </div>
    </div>
    <div class="row mt-4 justify-aligm-center">
      <div class="col-6 p-1">
        <div class="card-estilizado">
          <h6 class="card-title text-center">Entrada e sáida do armazém</h6>
          <div id="chart1" style="min-width: 600px; height:300px;"></div>
        </div>
      </div>
      <div class="col-6 p-1">
        <div class="card-estilizado">
          <h6 class="card-title text-center">Produtos no armazém e percentual</h6>
          <div id="chart2" style="min-width: 600px; height:300px;"></div>
        </div>
      </div>
      <div class="col-6 p-1">
        <div class="card-estilizado">
          <h6 class="card-title text-center">Entrada e sáida do armazém</h6>
          <div id="chart3" style="min-width: 600px; height:300px;"></div>
        </div>
      </div>
      <div class="col-6 p-1">
        <div class="card-estilizado">
          <h6 class="card-title text-center">Estoque minimo de produtos no armazém</h6>
          <div id="chart4" style="min-width: 600px; height:300px;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Estilo básico para o card */
.card-estilizado {
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E', 'Produto F', 'Produto G']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Entrada',
          data: [400, 600, 750, 480, 470, 510, 630],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        },
        {
          name: 'Saída',
          data: [300, 200, 550, 380, 430, 200, 530],
          type: 'line'
        }
      ]
    });

    const chart2 = echarts.init(document.getElementById('chart2'));
    chart2.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['Produto A', 'Produto B', 'Produto C', 'Produto D', 'Produto E', 'Produto F', 'Produto G']
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
          data: [400, 600, 750, 480, 470, 510, 630],
          type: 'bar',
        },
        {
          name: 'Em Estoque',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: [900, 1200, 1350, 880, 930, 2000, 790],
          type: 'line'
        }
      ]
    });
  },
}
</script>