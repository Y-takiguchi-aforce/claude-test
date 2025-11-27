/**
 * ログ出力機能の使用例
 * Usage example for logging functionality
 */

const { Logger, logger } = require('./logger');

console.log('=== デフォルトロガーのテスト ===');
console.log('=== Default Logger Test ===\n');

// デフォルトロガーでの基本的な使用例
logger.error('エラーメッセージの例');
logger.warn('警告メッセージの例');
logger.info('情報メッセージの例');
logger.debug('デバッグメッセージの例（通常は表示されません）');

console.log('\n=== カスタムロガーのテスト ===');
console.log('=== Custom Logger Test ===\n');

// カスタム設定でロガーを作成
const customLogger = new Logger({
    level: 'DEBUG',
    enableTimestamp: true,
    enableColors: true
});

customLogger.error('カスタムロガー: エラー');
customLogger.warn('カスタムロガー: 警告');
customLogger.info('カスタムロガー: 情報');
customLogger.debug('カスタムロガー: デバッグ');

console.log('\n=== ログレベル変更のテスト ===');
console.log('=== Log Level Change Test ===\n');

// ログレベルをERRORに変更
logger.setLevel('ERROR');
console.log('ログレベルをERRORに設定:');
logger.error('エラーのみ表示されます');
logger.warn('この警告は表示されません');
logger.info('この情報は表示されません');

// ログレベルをDEBUGに変更
logger.setLevel('DEBUG');
console.log('\nログレベルをDEBUGに設定:');
logger.error('全てのレベルが表示されます - エラー');
logger.warn('全てのレベルが表示されます - 警告');
logger.info('全てのレベルが表示されます - 情報');
logger.debug('全てのレベルが表示されます - デバッグ');

console.log('\n=== オブジェクトとエラーのログ出力テスト ===');
console.log('=== Object and Error Logging Test ===\n');

// オブジェクトのログ出力
const testObject = {
    name: 'テストオブジェクト',
    value: 42,
    nested: {
        prop: '入れ子のプロパティ'
    }
};

logger.info('オブジェクトのログ出力:', testObject);

// エラーオブジェクトのログ出力
const testError = new Error('テストエラーメッセージ');
logger.error('エラーオブジェクト:', testError);

console.log('\n=== ログ機能のテスト完了 ===');
console.log('=== Logging Test Complete ===');