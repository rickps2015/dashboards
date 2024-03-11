<template>
  <div class="container">
    <span class="animate__animated animate__fadeIn">
      <h5 class="card-title">Dashboard</h5>
      <h6 class="card-text">Bem-vindo ao Dashboard de Produtos do Estoque.</h6>
      <div class="row">
        <div class="col-auto p-1">
          <label for="selectArmazem" class="p-0">Armazém</label>
          <select class="form-select" v-model="selectedItems">
            <option v-for="item in items" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
        <div class="col-auto p-1">
          <label for="dataInicio" class="p-0">Data Início</label>
          <input id="dataInicio" type="datetime-local" class="form-control">
        </div>
        <div class="col-auto p-1">
          <label for="dataFim" class="p-0">Data Fim</label>
          <input id="dataFim" type="datetime-local" class="form-control">
        </div>
      </div>

      <!-- Cards de KPIs -->
      <div class="row mt-4 justify-content-center">
        <div class="col-auto kpi-card green-gradient">
          <span class="card-text">Nível de Estoque</span>
          <span class="card-value text-center">Qtd. 53.000</span>
        </div>

        <div class="col-auto kpi-card purple-gradient">
          <span class="card-text">Giro de Estoque Mensal</span>
          <span class="card-value text-center">2,5 vezes</span>
        </div>

        <div class="col-auto kpi-card red-gradient">
          <span class="card-text">Taxa de Ruptura</span>
          <span class="card-value text-center">6,54% </span>
        </div>
      </div>

      <!-- Botão de Download -->
      <div class="row justify-content-end">
        <div class="col-auto p-1">
          <button id="btnDownload" class="form-control fw-bold" @click="downloadExcel(dados_chart1)">Download</button>
          <i class="fa-solid fa-download"></i>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="row mt-4 justify-content-center">
        <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 p-1">
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
        <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 p-1">
          <div class="col-12">
            <div class="card-estilizado">
              <h6 class="card-title text-center">Produtos em maior quantidade no estoque</h6>
              <div id="chart5" style="height:640px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-aligm-center">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-1">
          <div class="card-estilizado">
            <h6 class="card-title text-center">Entrada e sáida do armazém</h6>
            <div id="chart3" style="height:300px;"></div>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 p-1">
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

#btnDownload:hover {
  background-color: rgba(114, 228, 92, 0.5);
  /* Change color on hover */
}

@media screen and (min-width: 501px) and (max-width: 608px) {
  .card-value {
    font-size: 100%;
  }
}

@media screen and (min-width: 320px) and (max-width: 500px) {
  .card-value {
    font-size: 70%;
  }

  .card-text {
    font-size: 60%;
  }
}
</style>

<script>
import * as echarts from 'echarts';
import * as XLSX from 'xlsx';

export default {
  name: 'HomeView',
  data() {
    return {
      selectedItems: 'Selecione um Armazém',
      items: ['Selecione um Armazém', 'Armazém 1', 'Armazém 2', 'Armazém 3', 'Armazém 4'],
      dados_chart1: [
        ['Produto', 'Entrada', 'Saída'],
        ['Produto A icww vwy8v8ywby8vwv wbvybv', 400, 300],
        ['Produto B', 600, 200],
        ['Produto C', 750, 550],
        ['Produto D', 480, 380],
        ['Produto E', 470, 430],
        ['Produto F', 510, 200],
        ['Produto G', 630, 530],
      ],
    };
  },
  mounted() {
    const chart1 = echarts.init(document.getElementById('chart1'));
    chart1.setOption({
      responsive: true,
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
    var options = {
      responsive: true,
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
                borderRadius: 4,
                fontSize: 14,
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
    };

    // Usar media queries para adaptar o gráfico
    function resizeChart() {
      var width = document.getElementById('chart2').offsetWidth;
      if (width < 600) {
        options.series[0].radius = ['6%', '12%'];
        options.series[0].label.rich.b.fontSize = 10;
        options.series[0].label.rich.per.fontSize = 10;
      } else {
        options.series[0].radius = ['40%', '20%'];
        options.series[0].label.rich.b.fontSize = 14;
        options.series[0].label.rich.per.fontSize = 14;
      }
      chart2.setOption(options);
    }

    window.addEventListener('resize', resizeChart);
    resizeChart();

    const chart3 = echarts.init(document.getElementById('chart3'));
    chart3.setOption({
      responsive: true,
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
      responsive: true,
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
        top: '10%',
        containLabel: true,
        height: '74%',
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
      responsive: true,
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

    // Redimensionar o gráfico ao redimensionar a janela
    window.onresize = function () {
      chart1.resize();
      chart2.resize();
      chart3.resize();
      chart4.resize();
      chart5.resize();
    };
  },
  methods: {
    downloadExcel(data) {
      // Criar uma nova instância de uma planilha Excel
      const workbook = XLSX.utils.book_new();

      // Adicionar a matriz de dados como uma nova planilha
      const worksheet = XLSX.utils.aoa_to_sheet(data);

      // Aplicar formatação de tabela
      worksheet["!autofilter"] = { ref: XLSX.utils.encode_range(XLSX.utils.decode_range(worksheet['!ref'])) };

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Converter o livro de trabalho em um arquivo binário
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Criar um blob a partir dos dados binários
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      // Criar um URL para o blob
      const url = window.URL.createObjectURL(blob);

      // Criar um link para o URL do blob e disparar um clique para iniciar o download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Estoque.xlsx';
      document.body.appendChild(a);
      a.click();

      // Limpar o URL do blob após o download
      window.URL.revokeObjectURL(url);
    },
  },
}
</script>