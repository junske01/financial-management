let chartInstance = null; // 차트를 전역 변수로 선언

document.getElementById('calculate-btn').addEventListener('click', () => {
  const income = parseFloat(document.getElementById('income').value);
  const housing = parseFloat(document.getElementById('housing').value);
  const food = parseFloat(document.getElementById('food').value);
  const transport = parseFloat(document.getElementById('transport').value);
  const savings = parseFloat(document.getElementById('savings').value);
  const other = parseFloat(document.getElementById('other').value);

  // 입력 값 유효성 검사
  if (isNaN(income) || isNaN(housing) || isNaN(food) || isNaN(transport) || isNaN(savings) || isNaN(other)) {
    alert('모든 항목을 올바르게 입력해주세요!');
    return;
  }

  // 총 지출 및 남은 소득 계산
  const totalExpense = housing + food + transport + savings + other;
  let remainingIncome = income - totalExpense;

  // 남은 소득이 음수인 경우 처리
  if (remainingIncome < 0) {
    alert('지출이 소득을 초과했습니다.');
    remainingIncome = 0; // 음수 값 제거
  }

  // 기존 차트 삭제
  if (chartInstance) {
    chartInstance.destroy();
  }

  // 데이터 배열 및 레이블 생성
  const labels = ['주거비', '식비', '교통비', '저축/투자', '기타'];
  const data = [housing, food, transport, savings, other];

  // 남은 소득이 0보다 크면 데이터에 추가
  if (remainingIncome > 0) {
    labels.push('남은 소득');
    data.push(remainingIncome);
  }

  // 새 차트 생성
  const ctx = document.getElementById('expenseChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#ff9f40']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const value = context.raw.toLocaleString();
              return `${context.label}: ₩${value}`;
            }
          }
        }
      }
    }
  });

  // 결과 표시
  document.getElementById('result').innerHTML = `
    <h2>결과</h2>
    <p>총 지출: ₩${totalExpense.toLocaleString()}</p>
    <p>남은 소득: ₩${remainingIncome.toLocaleString()}</p>
  `;
});
