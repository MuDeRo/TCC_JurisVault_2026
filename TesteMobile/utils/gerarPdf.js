import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export async function gerarRelatorioProcesso(processo) {
  const htmlContent = `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 20px; color: #333; }
          .header { text-align: center; border-bottom: 2px solid #1E88E5; padding-bottom: 10px; margin-bottom: 20px; }
          .title { font-size: 20px; font-weight: bold; color: #1E88E5; }
          .subtitle { font-size: 12px; color: #666; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; font-size: 12px; color: #555; }
          .value { font-size: 14px; margin-top: 2px; }
          .status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-weight: bold; font-size: 12px; background-color: #E3F2FD; color: #0288D1; }
          .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #ddd; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">ESCRITÓRIO DE ADVOCACIA</div>
          <div class="subtitle">Relatório Oficial de Acompanhamento Processual</div>
        </div>

        <div class="field">
          <div class="label">STATUS DO PROCESSO</div>
          <div class="value"><span class="status">${processo.status || 'Em andamento'}</span></div>
        </div>

        <div class="field">
          <div class="label">NÚMERO DO PROCESSO</div>
          <div class="value">${processo.numero}</div>
        </div>

        <div class="field">
          <div class="label">TIPO DE AÇÃO</div>
          <div class="value">${processo.acao}</div>
        </div>

        <div class="field">
          <div class="label">CLIENTE</div>
          <div class="value">${processo.cliente}</div>
        </div>

        <div class="field">
          <div class="label">ETAPA / FASE ATUAL</div>
          <div class="value">${processo.fase || 'Não informada'}</div>
        </div>

        <div class="footer">
          Documento gerado em ${new Date().toLocaleDateString('pt-BR')} via Sistema Jurídico Mobile.
        </div>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
  }
}