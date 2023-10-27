describe('Frames Test', () => {
  it('should switch to iframe and type text', async () => {
    await browser.url('/iframe');
    const iframe = await $('#mce_0_ifr');
    await browser.switchToFrame(iframe);
    const textArea = await $('#tinymce');
    await textArea.setValue('Testing iframe');
    expect(await textArea.getText()).toEqual('Testing iframe');
  });
});
