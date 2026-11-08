import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  line: { labels: string[]; puntajes: number[] };
  distribution: number[];
}

export const ChartsSection = ({ line, distribution }: Props) => {
  const hasLine = line.labels.length > 0;
  const hasDist = distribution.reduce((a, b) => a + b, 0) > 0;

  return (
    <div className="grid lg:grid-cols-2 gap-6 mb-8">
      <div className="card-glass">
        <h5 className="font-bold mb-4 text-white">📈 Progreso en Simulacros</h5>
        {hasLine ? (
          <Line
            data={{
              labels: line.labels,
              datasets: [
                {
                  label: 'Puntaje (%)',
                  data: line.puntajes,
                  borderColor: '#3bbcff',
                  backgroundColor: 'rgba(59,188,255,0.15)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0.45,
                  pointBackgroundColor: '#f5c77a',
                  pointBorderColor: '#0a0f1a',
                  pointBorderWidth: 2,
                  pointRadius: 5,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: { legend: { labels: { color: '#e5e7eb' } } },
              scales: {
                y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.06)' }, ticks: { color: '#9ca3af' } },
                x: { grid: { display: false }, ticks: { color: '#9ca3af' } },
              },
            }}
          />
        ) : (
          <p className="text-gray-400 text-center py-12">Aún no tienes simulacros realizados</p>
        )}
      </div>

      <div className="card-glass">
        <h5 className="font-bold mb-4 text-white">🎯 Desempeño General</h5>
        {hasDist ? (
          <div className="max-w-[320px] mx-auto">
            <Doughnut
              data={{
                labels: ['Excelente 80%+', 'Muy Bien 60-79%', 'Mejorable 40-59%', 'Necesita Trabajo <40%'],
                datasets: [
                  {
                    data: distribution,
                    backgroundColor: ['#10b981', '#3bbcff', '#f5c77a', '#ef4444'],
                    borderWidth: 0,
                  },
                ],
              }}
              options={{
                cutout: '65%',
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: { color: '#e5e7eb', padding: 16, boxWidth: 12 },
                  },
                },
              }}
            />
          </div>
        ) : (
          <p className="text-gray-400 text-center py-12">Completa simulacros para ver estadísticas</p>
        )}
      </div>
    </div>
  );
};