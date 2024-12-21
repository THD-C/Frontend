fixture('THD(C)')
    .page('http://localhost:4200/login');

test('Submit a profile details update', async t => {
    await t
        // automatically dismiss dialog boxes
        .setNativeDialogHandler(() => true)
        .typeText('dx-text-box[label="E-mail or username"]', 'test')
        .typeText('dx-text-box[label="Password"]', 'test1234567890')

        .click('dx-button[text="Log in"]')

        .navigateTo('/profile')
        .typeText('dx-text-box[label="City"]', 'NEW CITY')
        .click('#buttonSave')

        .wait(4_000)
});
