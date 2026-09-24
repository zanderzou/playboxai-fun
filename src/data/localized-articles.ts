import type { LocaleSlug } from "./localized-playbox";

export const articleOrder = ["musebox", "runway", "kling-ai", "pika", "luma-dream-machine"] as const;
export type ComparisonKey = typeof articleOrder[number];
export const comparedBrand: Record<ComparisonKey, string> = {
  musebox: "Musebox AI", runway: "Runway", "kling-ai": "Kling AI", pika: "Pika", "luma-dream-machine": "Luma"
};
export const articleSources: Record<ComparisonKey, { playbox: string; product: string; safety: string }> = {
  musebox: { playbox: "https://www.playbox.com/", product: "https://musebox.ai/ai-video-generator/", safety: "https://www.playbox.com/terms-and-conditions" },
  runway: { playbox: "https://www.playbox.com/", product: "https://help.runwayml.com/hc/en-us/articles/37425232841875-Getting-Started-with-Generative-Video", safety: "https://www.playbox.com/terms-and-conditions" },
  "kling-ai": { playbox: "https://www.playbox.com/", product: "https://kling.ai/quickstart", safety: "https://www.playbox.com/terms-and-conditions" },
  pika: { playbox: "https://www.playbox.com/", product: "https://pika.art/faq", safety: "https://www.playbox.com/terms-and-conditions" },
  "luma-dream-machine": { playbox: "https://www.playbox.com/", product: "https://lumalabs.ai/llm-info", safety: "https://www.playbox.com/terms-and-conditions" }
};
export interface LocalizedComparison { title: string; description: string; intro: string; verdict: string; sections: [string, string][] }
export const localizedComparisons: Partial<Record<LocaleSlug, Record<ComparisonKey, LocalizedComparison>>> = {
  ja: {
    musebox: {
      title: "Playbox AI vs Musebox AI：テンプレート選びと発想探しの違い", description: "Playbox AI と Musebox AI の画像動画ワークフローを、着想、本人画像の条件、出力の安定、クレジット、公開範囲から比較します。",
      intro: "短い動画を作る前に、動きの完成形が既に決まっているかを考えてください。Playbox.com は Explore でテンプレートを選ぶ入口が目立ちます。一方、Musebox は画像や文章から動画を作る案内に加え、作品探索が発想の一部になります。どちらが速いかは、案を探す時間まで含めて初めて分かります。",
      verdict: "セルフポートレートを一つのテンプレートで動かすなら Playbox の絞られた操作を検討。参考作品を眺めて方向を探すなら Musebox の制作導線も見る。ただし当サイトは両社の生成品質を実測して勝者を決めたわけではありません。",
      sections: [["最初の五分で何が決まるか", "Playbox の場合はカテゴリやテンプレートを見て、どの動きを試すか決めます。Musebox では画像と文章のどちらから始めるか、参考にした作品をどう自分の指示に変えるかが先です。検索時間と生成時間を別々に記録すると、自分に合う入口が見えてきます。"], ["同じ素材を使えるとは限らない", "Playbox.com の現行規約は、写真に写るのがアップロードする本人だけであることを求めます。他人の肖像を許諾だけで入れられるとは書けません。比較に自分の成人写真を使う場合でも、Musebox 側の最新規約を別途確認してください。"], ["出来上がった動画の見方", "どちらも宣伝用の良い作例だけを見ず、顔の変形、手、服、背景、終端フレームを一つずつ確認します。使える秒数、失敗した試行、目的に合わなかったテンプレートを残し、一本の完成に要した総コストを見ます。"], ["保存と公開の違い", "ギャラリーを眺める体験と、自分の画像や出力が公開される範囲は別問題です。Playbox の Collection、Musebox の保存・共有設定で、誰が見られるか、削除がどこからできるかを操作前に確かめてください。"]]
    },
    runway: {
      title: "Playbox AI vs Runway：短いテンプレート動画か制作環境か", description: "Playbox AI の成人セルフポートレート向けテンプレートと Runway の Tools・Apps・Agent・Workflows を、作業量、編集、費用と画像条件で比べます。",
      intro: "この比較は画質だけで決まりません。Playbox はテンプレートを起点に短い動画を作る用途が分かりやすい一方、Runway の公式ガイドは Tools、Apps、Agent、Workflows という異なる作業入口を説明しています。欲しいのが一つの短いカットなのか、何度も改稿する映像プロジェクトなのかで選び方が変わります。",
      verdict: "一つの成人セルフポートレートをテンプレートで素早く試すなら Playbox の流れを評価。複数のカットや反復編集を管理するなら Runway の広い制作環境を評価。『機能が多い方が高品質』とは推論しません。",
      sections: [["一枚から一カット、または制作セッション", "Playbox では試したい動きのテンプレートを探す時間と生成結果が中心です。Runway は Tools で入力と設定を制御し、Apps で用途別の操作、Agent や Workflows で複数工程を扱えます。短いSNS動画と継続的な制作では必要な機能が違います。"], ["比較の公平な作り方", "同じ動作目標を文章にして、各サービスの規約を満たす成人本人画像で試す方法を提案します。顔の継続、背景、カメラの軌道、終端を採点し、出力を再編集するまでの手数も数えます。これは読者向け手順で、当サイトの実測結果ではありません。"], ["クレジットだけではない費用", "Playbox のテンプレート再試行と Runway のモデル選択・生成・編集は課金単位が異なる可能性があります。生成回数の単価だけでなく、使えるカット一本までの全消費と編集時間を並べましょう。最新の価格と払い戻しは公式画面で確認してください。"], ["画像の権利と保管", "Playbox.com はアップロード者本人だけが写る画像を条件としています。Runway に同じ画像を持ち込むなら同社の現行ルールも読み、制作セッションの保存と削除、公開設定を確かめます。どちらでも未成年や無断の人物加工をしないでください。"]]
    },
    "kling-ai": {
      title: "Playbox AI vs Kling AI：テンプレートと運動指示をどう比べる？", description: "Playbox AI の画像動画テンプレートと Kling AI の動画生成・カメラ制御を、動きの指示、フレームの安定、再試行費用、安全な入力で比較します。",
      intro: "Playbox のギャラリーから『こんな動きにしたい』と選ぶ方法と、Kling AI でカメラや動作を指定する方法では、最初に必要な判断が異なります。公式の Kling クイックスタートは画像から動画、モーションコントロール、カメラ移動などの機能に案内します。ただし機能の有無だけで、自分の画像の結果を予測することはできません。",
      verdict: "選んだ動きのテンプレートを短時間で試したいなら Playbox。カメラの方向や動作の細部を調整したいなら Kling の現行画面を確認。優劣は同じ短い動作で出力の連続性と費用を比べて判断します。",
      sections: [["テンプレートか運動の記述か", "Playbox では事前に用意された例から近い動きを見つけます。Kling では画像動画に加え、公式ガイドがカメラ移動やモーションコントロールを示します。求める動きが既成の例に近いか、独自の方向付けが必要かを最初に決めます。"], ["時間方向の破綻を見る", "動作の強さより、最初のフレームから最後まで顔、手、衣服、背景が自然につながるかを評価します。同じ『ゆっくり振り向く』という目標で、成功例だけでなく採用できなかった試行も残すと、使える秒数の差が分かります。"], ["操作量と費用", "細かい制御が可能でも、設定に時間がかかり再試行が増えれば作業コストは上がります。Playbox はテンプレート選択の速さ、Kling は指定した動きに近づける手間を記録し、各社の現在のクレジット表示で総額を確認してください。"], ["写真の条件は別々に確認", "Playbox.com は本人だけが写る画像を求めます。Kling の規約も別途確認し、未成年や許可のない実在者の画像を入力しないでください。比較用画像に機密の位置情報が含まれていないかも確認します。"]]
    },
    pika: {
      title: "Playbox AI vs Pika：肖像テンプレートと短編エフェクト", description: "Playbox AI と Pika を、成人セルフポートレートの動き、エフェクト、原画の保持、作品公開の可能性、クレジットで比較します。",
      intro: "同じ短いAI動画でも、Playbox の成人画像テンプレートと Pika のソーシャル向けエフェクトは狙いが違います。Pika の公式ヘルプは画像動画、テキスト動画、Pikaffects やフレーム指定などを説明します。目立つ変化が欲しいのか、自分の顔と元画像を保ちたいのかで評価軸を分けましょう。",
      verdict: "自分の肖像を選んだ動きで試すなら Playbox のテンプレートと利用条件を確認。効果や場面転換を試したいなら Pika の用途別機能を確認。ただし Pika の公式FAQは作品がテンプレートページに選ばれる可能性にも触れるため、公開範囲は重要です。",
      sections: [["変化と忠実さは別の点数", "Pika のエフェクトは元の画像から大きく変える遊びに向きますが、それは顔や背景の同一性を保つ評価とは違います。Playbox のテンプレートと比べる時は、面白さ、元画像の保持、狙った動作の実現を三つに分けて記録してください。"], ["フレームと長さの設計", "Pika には開始と終わりの画像を使う機能や延長系の動画アプリが案内されています。必要なのが一つの短い動きか、複数の見せ場を連ねることかを先に決めます。宣伝される最大尺はモデルやプランで変わるため固定値として比較しません。"], ["公開と商用利用", "Pika の公式FAQには、作った動画がテンプレート面に選ばれる可能性や、プランで商用利用条件が違うことが書かれています。Playbox の Collection とも対照し、人物画像を投入する前に可視性、削除、公開先の権利を確かめましょう。"], ["Playbox への入力規則", "Playbox.com の現行規約は利用者本人だけが写る写真を求めます。他人の肖像を『Pikaでは使えるかもしれない』という理由で Playbox に持ち込めません。両社それぞれの現在の条件を満たした成人画像だけで比較してください。"]]
    },
    "luma-dream-machine": {
      title: "Playbox AI vs Luma：旧 Dream Machine 名から現在の動画制作へ", description: "Playbox AI の成人セルフポートレート向けテンプレートと現行 Luma の Ray・制作アプリを、参照画像、工程、費用、入力規則から比較します。",
      intro: "『Luma Dream Machine』で検索して来た場合、まず名称を更新してください。Luma 自身の説明では Dream Machine は旧モデル名で、現在の動画制作は Ray と Luma アプリが中心です。Playbox.com は成人向けの画像動画テンプレートを入口とします。古い名称と今の製品を同じ時点の機能表で比べないことが大切です。",
      verdict: "短い成人セルフポートレートの動きをテンプレートで試すなら Playbox の目的に合うかを確認。複数の参照や映像制作工程が必要なら現行 Luma を確認。モデルが広いことと、あなたの一枚での成功率は同義ではありません。",
      sections: [["名前と現行製品を分ける", "Dream Machine の古いレビューを基準にすると、現行の Luma のモデルや画面と食い違うことがあります。公式資料は Ray の画像動画、テキスト動画、複数キーフレームによる方向付けなどを紹介しています。検討時には現在利用できる機能とプランを確認してください。"], ["単一テンプレートか長い制作工程か", "Playbox のテンプレートは短い一場面に近い入口です。Luma の広い作業環境はショットの改稿や複数の素材をつなぐ計画に価値があるかもしれません。必要な成果が一つのSNS用クリップなのか、後編集を含む映像なのかで評価します。"], ["同じ課題で測る方法", "成人本人の画像と一つの動きを定義し、それぞれの現行規約に従って試します。顔と背景の保ち方、指示への追従、使える秒数、再生成、編集に移るまでの手間を記録します。これは提案手順であり、当サイトの実測ランキングではありません。"], ["費用と画像保護", "Playbox.com では本人のみの写真という制約を守り、Luma 側のアップロード条件は別途読みます。各サービスのクレジット、保存、削除、書き出し権は変更され得るため、支払いと入力の直前に公式画面を確認してください。"]]
    }
  }
};
