import * as Toast from '#/view/com/util/Toast';

export function onLoadFinalWhatever() { }

export function showTheToastWithText(text: string) {
    Toast.show(
        "[ocbwoy3] " + text,
        'info',
    )
}

export function showTheToastWithTextDeffered(text: string) {
    setTimeout(() => {
        showTheToastWithText(text)
    }, 1500)
}