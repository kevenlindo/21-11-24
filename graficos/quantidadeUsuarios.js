import { getCSS, tickConfig } from "./common.js"

async function quantidadeTitulosPorJogador() {
    // URL with data for snooker players and their titles (World Championship wins)
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/snooker-players-titles.json';
    const res = await fetch(url);
    const dados = await res.json();

    // Extract player names and title counts from the data
    const nomeDosJogadores = Object.keys(dados);  // Player names
    const quantidadeDeTitulos = Object.values(dados);  // Number of titles each player has won

    // Data for the bar chart
    const data = [
        {
            x: nomeDosJogadores, 
            y: quantidadeDeTitulos, 
            type: 'bar',  // Bar chart type
            marker: {
                color: getCSS('--accent-color')  // Brown color to represent snooker cues
            }
        }
    ];

    // Layout for the snooker-themed graph
    const layout = {
        plot_bgcolor: getCSS('--bg-color'),  // Light background color
        paper_bgcolor: getCSS('--bg-color'),  // Same background color for paper
        title: {
            text: 'Jogadores de Sinuca com Mais Títulos',
            x: 0,  // Centered title
            font: {
                color: getCSS('--primary-color'),  // Dark green for title color, resembling the snooker table
                size: 30,  // Large title
                family: getCSS('--font')  // Font from the snooker theme
            }
        },
        xaxis: {
            tickfont: tickConfig,  // Font configuration for the x-axis labels
            title: {
                text: 'Nome dos jogadores',  // X-axis title
                font: {
                    color: getCSS('--secondary-color')  // Light gray for x-axis title
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,  // Font configuration for the y-axis labels
            title: {
                text: 'Número de títulos conquistados',  // Y-axis title
                font: {
                    color: getCSS('--secondary-color')  // Light gray for y-axis title
                }
            }
        }
    };

    // Create a div element to hold the graph
    const grafico = document.createElement('div');
    grafico.className = 'grafico';
    document.getElementById('graficos-container').appendChild(grafico);

    // Render the graph using Plotly
    Plotly.newPlot(grafico, data, layout);
}

// Call the function to render the chart
quantidadeTitulosPorJogador();
