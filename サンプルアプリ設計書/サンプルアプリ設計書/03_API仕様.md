# API仕様

## 変更履歴

| バージョン | 日付 | 変更内容 |
|-----------|------|---------|
| 1.2 | 2025-11-27 | startDate, endDate を必須項目に変更 |
| 1.1 | 2025-11-27 | startDate, endDate, progress フィールドを全APIレスポンスに追加 |
| 1.0 | 2024-11-26 | 初版作成 |

## 1. 概要

### ベースURL
```
http://localhost:3000
```

### APIパス
```
/api
```

### 共通ヘッダー
| ヘッダー | 値 |
|---------|-----|
| Content-Type | application/json |

## 2. レスポンス形式

### 成功レスポンス
```json
{
  "success": true,
  "data": <データ>,
  "message": "メッセージ（任意）",
  "count": <件数（一覧取得時のみ）>
}
```

### エラーレスポンス
```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

## 3. エンドポイント一覧

| メソッド | パス | 機能 |
|---------|------|------|
| GET | /api/tasks | タスク一覧取得 |
| GET | /api/tasks/:id | タスク詳細取得 |
| POST | /api/tasks | タスク作成 |
| PUT | /api/tasks/:id | タスク更新 |
| DELETE | /api/tasks/:id | タスク削除 |

---

## 4. タスク一覧取得

### エンドポイント
```
GET /api/tasks
```

### リクエスト
なし

### レスポンス

#### 成功時 (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "API仕様書を作成",
      "description": "REST APIエンドポイントの仕様書をMarkdown形式で作成する",
      "status": "TODO",
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2024-01-01T00:00:00.000Z",
      "progress": 0,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### エラー時 (500 Internal Server Error)
```json
{
  "success": false,
  "error": "タスク一覧の取得に失敗しました"
}
```

---

## 5. タスク詳細取得

### エンドポイント
```
GET /api/tasks/:id
```

### パスパラメータ
| パラメータ | 型 | 説明 |
|-----------|------|------|
| id | number | タスクID |

### レスポンス

#### 成功時 (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "API仕様書を作成",
    "description": "REST APIエンドポイントの仕様書をMarkdown形式で作成する",
    "status": "TODO",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-01-01T00:00:00.000Z",
    "progress": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### エラー時

**400 Bad Request** - 無効なID
```json
{
  "success": false,
  "error": "無効なタスクIDです"
}
```

**404 Not Found** - タスクが存在しない
```json
{
  "success": false,
  "error": "タスクが見つかりません"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": "タスクの取得に失敗しました"
}
```

---

## 6. タスク作成

### エンドポイント
```
POST /api/tasks
```

### リクエストボディ
```json
{
  "title": "新しいタスク",
  "description": "タスクの詳細説明",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "progress": 25
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|------|------|------|
| title | string | ○ | タスク名（空文字不可） |
| description | string | - | 詳細説明 |
| startDate | string | ○ | 開始日（YYYY-MM-DD形式） |
| endDate | string | ○ | 終了日（YYYY-MM-DD形式） |
| progress | number | - | 進捗状況（0/25/50/75/100のみ許可、デフォルト: 0） |

**進捗とステータスの同期:**
- progress を指定すると、ステータスが自動設定されます
  - 0% → TODO
  - 25%, 50%, 75% → IN_PROGRESS
  - 100% → DONE

### レスポンス

#### 成功時 (201 Created)
```json
{
  "success": true,
  "data": {
    "id": 4,
    "title": "新しいタスク",
    "description": "タスクの詳細説明",
    "status": "IN_PROGRESS",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-01-31T00:00:00.000Z",
    "progress": 25,
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  },
  "message": "タスクを作成しました"
}
```

#### エラー時

**400 Bad Request** - タスク名が未入力
```json
{
  "success": false,
  "error": "タスク名は必須です"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": "タスクの作成に失敗しました"
}
```

---

## 7. タスク更新

### エンドポイント
```
PUT /api/tasks/:id
```

### パスパラメータ
| パラメータ | 型 | 説明 |
|-----------|------|------|
| id | number | タスクID |

### リクエストボディ
```json
{
  "title": "更新後のタスク名",
  "description": "更新後の説明",
  "status": "IN_PROGRESS",
  "startDate": "2024-01-05",
  "endDate": "2024-01-20",
  "progress": 50
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|------|------|------|
| title | string | - | タスク名 |
| description | string | - | 詳細説明 |
| status | string | - | ステータス（TODO / IN_PROGRESS / DONE） |
| startDate | string | - | 開始日（YYYY-MM-DD形式） |
| endDate | string | - | 終了日（YYYY-MM-DD形式） |
| progress | number | - | 進捗状況（0/25/50/75/100のみ許可） |

※ 指定したフィールドのみ更新されます

**進捗とステータスの双方向同期:**
- progress を変更すると、ステータスが自動的に同期されます
  - 0% → TODO
  - 25%, 50%, 75% → IN_PROGRESS
  - 100% → DONE
- status を変更すると、進捗が自動的に同期されます
  - TODO → 0%
  - IN_PROGRESS → 25%
  - DONE → 100%

### レスポンス

#### 成功時 (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "更新後のタスク名",
    "description": "更新後の説明",
    "status": "IN_PROGRESS",
    "startDate": "2024-01-05T00:00:00.000Z",
    "endDate": "2024-01-20T00:00:00.000Z",
    "progress": 50,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  },
  "message": "タスクを更新しました"
}
```

#### エラー時

**400 Bad Request** - 無効なID
```json
{
  "success": false,
  "error": "無効なタスクIDです"
}
```

**404 Not Found** - タスクが存在しない
```json
{
  "success": false,
  "error": "タスクが見つかりません"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": "タスクの更新に失敗しました"
}
```

---

## 8. タスク削除

### エンドポイント
```
DELETE /api/tasks/:id
```

### パスパラメータ
| パラメータ | 型 | 説明 |
|-----------|------|------|
| id | number | タスクID |

### レスポンス

#### 成功時 (200 OK)
```json
{
  "success": true,
  "message": "タスクを削除しました"
}
```

#### エラー時

**400 Bad Request** - 無効なID
```json
{
  "success": false,
  "error": "無効なタスクIDです"
}
```

**404 Not Found** - タスクが存在しない
```json
{
  "success": false,
  "error": "タスクが見つかりません"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": "タスクの削除に失敗しました"
}
```

---

## 9. その他のエンドポイント

### ルート
```
GET /
```

**レスポンス (200 OK)**
```json
{
  "message": "Todo API Server",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "tasks": "/api/tasks"
  }
}
```

### ヘルスチェック
```
GET /health
```

**レスポンス (200 OK)**
```json
{
  "status": "OK",
  "message": "Todo API Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 404エラー
存在しないエンドポイントへのアクセス

**レスポンス (404 Not Found)**
```json
{
  "success": false,
  "error": "エンドポイントが見つかりません"
}
```

---

## 10. HTTPステータスコード一覧

| コード | 意味 | 使用場面 |
|--------|------|---------|
| 200 | OK | 取得・更新・削除成功 |
| 201 | Created | 作成成功 |
| 400 | Bad Request | 無効なパラメータ、バリデーションエラー |
| 404 | Not Found | リソースが存在しない |
| 500 | Internal Server Error | サーバー内部エラー |
