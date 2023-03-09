describe("EMAIL-WORKER", () => {
  describe("Email-Payload Positive Cases", () => {
    //Positive Test Cases
    test("Email-worker-payload", () => {
      let queuePayloadPositiveCases = {
        requestid: "kBJCkhdQOd1Zr4s",
        apikey: "jxqA2OvBovo6VLRb",
        data: {
          from: "kratika.mtalkz@gmail.com",
          personalizations: [
            {
              to: [
                {
                  email: "kratikakaushik27@gmail.com",
                },
                {
                  email: "kratikakaushik85@gmail.com",
                },
              ],
            },
          ],
          template_id: "d-e15108ed18544bdaaff63d26d9fce548",
        },
        channel: "email",
      };
      expect(queuePayloadPositiveCases.requestid).not.toEqual(undefined);
      expect(queuePayloadPositiveCases.apikey).not.toBe(undefined);
      expect(queuePayloadPositiveCases.data.from).not.toEqual(undefined);
      const personalizations = queuePayloadPositiveCases.data.personalizations;
      for (let i = 0; i < personalizations.length; i += 1) {
        expect(personalizations[i].to[0]).not.toBe(undefined);
        expect(personalizations[i].to[0]).not.toBe(null);
      }
      expect(queuePayloadPositiveCases.data.template_id).not.toEqual(undefined);
      expect(queuePayloadPositiveCases.channel).toEqual("email");
    });
  });

  describe("Email-payload Negative test cases", () => {
    //Negative Test Cases
    test("RequestId is not defined with payload", () => {
      const RequestId_not_defined = {
        apikey: "jxqA2OvBovo6VLRb",
        data: {
          from: "kratika.mtalkz@gmail.com",
          personalizations: [
            {
              to: [
                {
                  email: "kratikakaushik27@gmail.com",
                },
                {
                  email: "kratikakaushik85@gmail.com",
                },
              ],
            },
          ],
          template_id: "d-e15108ed18544bdaaff63d26d9fce548",
        },
        channel: "email",
      };
      expect(RequestId_not_defined.requestid).toBe(undefined);
      expect(RequestId_not_defined.apikey).not.toBe(undefined);
      expect(RequestId_not_defined.data.from).not.toEqual(undefined);
      const personalizations = RequestId_not_defined.data.personalizations;
      for (let i = 0; i < personalizations.length; i += 1) {
        expect(personalizations[i].to[0]).not.toBe(undefined);
        expect(personalizations[i].to[0]).not.toBe(null);
      }
      expect(RequestId_not_defined.data.template_id).not.toEqual(undefined);
      expect(RequestId_not_defined.channel).toEqual("email");
    });
    test("APIKey is not defined with payload", () => {
      const API_Key_not_defined = {
        requestid: "kBJCkhdQOd1Zr4s",
        data: {
          from: "kratika.mtalkz@gmail.com",
          personalizations: [
            {
              to: [
                {
                  email: "kratikakaushik27@gmail.com",
                },
                {
                  email: "kratikakaushik85@gmail.com",
                },
              ],
            },
          ],
          template_id: "d-e15108ed18544bdaaff63d26d9fce548",
        },
        channel: "email",
      };
      expect(API_Key_not_defined.requestid).not.toBe(undefined);
      expect(API_Key_not_defined.apikey).toBe(undefined);
      expect(API_Key_not_defined.data.from).not.toEqual(undefined);
      const personalizations = API_Key_not_defined.data.personalizations;
      for (let i = 0; i < personalizations.length; i += 1) {
        expect(personalizations[i].to[0]).not.toBe(undefined);
        expect(personalizations[i].to[0]).not.toBe(null);
      }
      expect(API_Key_not_defined.data.template_id).not.toEqual(undefined);
      expect(API_Key_not_defined.channel).toEqual("email");
    });
    test("From email is not defined", () => {
      const fromemail = {
        requestid: "kBJCkhdQOd1Zr4s",
        apikey: "jxqA2OvBovo6VLRb",
        data: {
          personalizations: [
            {
              to: [
                {
                  email: "kratikakaushik27@gmail.com",
                },
                {
                  email: "kratikakaushik85@gmail.com",
                },
              ],
            },
          ],
          template_id: "d-e15108ed18544bdaaff63d26d9fce548",
        },
        channel: "email",
      };
      expect(fromemail.requestid).not.toEqual(undefined);
      expect(fromemail.apikey).not.toBe(undefined);
      expect(fromemail.data.from).toEqual(undefined);
      const personalizations = fromemail.data.personalizations;
      for (let i = 0; i < personalizations.length; i += 1) {
        expect(personalizations[i].to[0]).not.toBe(undefined);
        expect(personalizations[i].to[0]).not.toBe(null);
      }
      expect(fromemail.data.template_id).not.toEqual(undefined);
      expect(fromemail.channel).toEqual("email");
    });
    test("Personalization to-email is not defined", () => {
      const toemail = {
        requestid: "kBJCkhdQOd1Zr4s",
        apikey: "jxqA2OvBovo6VLRb",
        data: {
          from: "kratika.mtalkz@gmail.com",
          personalizations: [{}],
          template_id: "d-e15108ed18544bdaaff63d26d9fce548",
        },
        channel: "email",
      };
      expect(toemail.requestid).not.toEqual(undefined);
      expect(toemail.apikey).not.toBe(undefined);
      expect(toemail.data.from).not.toEqual(undefined);
      const personalizations = toemail.data.personalizations;
      for (let i = 0; i < personalizations.length; i += 1) {
        expect(personalizations[i].to).toBe(undefined);
      }
      expect(toemail.data.template_id).not.toEqual(undefined);
      expect(toemail.channel).toEqual("email");
    });
    test("TemplateID is not defined", () => {
      const template = {
        requestid: "kBJCkhdQOd1Zr4s",
        apikey: "jxqA2OvBovo6VLRb",
        data: {
          from: "kratika.mtalkz@gmail.com",
          personalizations: [
            {
              to: [
                {
                  email: "kratikakaushik27@gmail.com",
                },
                {
                  email: "kratikakaushik85@gmail.com",
                },
              ],
            },
          ],
        },
        channel: "email",
      };
      expect(template.requestid).not.toEqual(undefined);
      expect(template.apikey).not.toBe(undefined);
      expect(template.data.from).not.toEqual(undefined);
      const personalizations = template.data.personalizations;
      for (let i = 0; i < personalizations.length; i += 1) {
        expect(personalizations[i].to[0]).not.toBe(undefined);
        expect(personalizations[i].to[0]).not.toBe(null);
      }
      expect(template.data.template_id).toEqual(undefined);
      expect(template.channel).toEqual("email");
    });
    test("Channel is not defined as email Channel", () => {
      const channelname = {
        requestid: "kBJCkhdQOd1Zr4s",
        apikey: "jxqA2OvBovo6VLRb",
        data: {
          from: "kratika.mtalkz@gmail.com",
          personalizations: [
            {
              to: [
                {
                  email: "kratikakaushik27@gmail.com",
                },
                {
                  email: "kratikakaushik85@gmail.com",
                },
              ],
            },
          ],
          template_id: "d-e15108ed18544bdaaff63d26d9fce548",
        },
      };
      expect(channelname.requestid).not.toEqual(undefined);
      expect(channelname.apikey).not.toBe(undefined);
      expect(channelname.data.from).not.toEqual(undefined);
      const personalizations = channelname.data.personalizations;
      for (let i = 0; i < personalizations.length; i += 1) {
        expect(personalizations[i].to[0]).not.toBe(undefined);
        expect(personalizations[i].to[0]).not.toBe(null);
      }
      expect(channelname.data.template_id).not.toEqual(undefined);
      expect(channelname.channel).not.toEqual("email");
    });
  });
});
