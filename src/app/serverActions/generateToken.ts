'use server';

import * as jwt from 'jsonwebtoken';

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCfUW+hG/2DcSjC
eWBRHaJyXWpMQKoGRQg9Nh9UET/JzsAOUHROSPyPr7TGgbnROnGhy3c8k3ZUPlLr
mFxIiq6GmUiXHfOGJ4+fOgkeWQ6BW+v54wPDQuSoynqDrKHPGUKzoKg32iocMnbY
mkH+XdhmXAMcfwcRBfq6b7Ccs8Iu0g5HE6F/KuySDBfxUODO6KAaJKJDKXv6OrG3
KfEexe/mDaM+Ze/Kw4Ykl66S8T6eNyaQMW6w1QPTxzLGG66xr2GhST2yr6PJkEM8
iFaFBchsKl6ZrUpJQfyfUQZYnzoxct8y1Z/L555f/7RvEqFX9rHUmdWMldNkz0ez
slLY7w1ZAgMBAAECggEAY1ih1oIgxO00cIjFke970/sChQgxvfUgHSN5x6916n79
bi+nRwXmUCdOABb260yZfT3mXaTKvd+bT4RTz3yDNjWxeWJY8AgNXEoRU5ZPIEVU
0h9IwmMdOVABs8hbokvrNx3wp9toNOsXBxyyGE8m2TV5TzS7EFd9MPLi2+SQKyce
WYlcZz3Pjn0DGSH9i0mF2c5hQy4NYqKoy9eyB7nH7xsUllnWT3ENW8rRxXdyGwKN
Vhe50FnVJVFrMPkwdGjeW1rAb19sVxO3h68bhFPIgW6SR5k2skH9xKSHOq4nA0cK
RHF9P8Hne1wbUFodE/DMrUVTW/4TFg31OvQ5TZcPcQKBgQDfCGQcRuuYPnMO8Jvo
bEXGeAnDMendGx0ZFUWDru3YQ+uYE9M4T0n4FtmBl/nOKZtbq/FerkfT2kg2KcZm
Mppq2EPtmQWbNUc17PuLYnULAgZz8Or7IA5KmAnUe8r8dRqoawQN5p/miEgZafPR
/tL3qC/cGI4F56vY7OEtUB5cDQKBgQC23hFsn2Lvvw6V/Z/WN+64tnGGH9rOkb1Z
mUA3yzCweY2iMar2HdW/KO9L1HCy0nR9F5kCQm+vodskj7olo3ZkluMzAifLvOvH
ualzeIPRXv7qafHPGTYZyPjnwwY7SKGrzkQbXMm8ohRJacCeT8AQ23yIB/62esH6
ecIHiUbHfQKBgEaZOF8/D8pkUjVzclaTF08opiZ0gUutDnvnINb7I2ymq0e7Vsvn
RUnTqcv82GUrBHNzLPdEgZYM7Xi/pn6pG/ogNPhbzMuBhOYL+t/3LYdrf7FpnGgb
kIqKL+pjuTBKvUJ8hY8E5q6pivEIedaKLCuawHOSDjrOR7Zl3S1jxAhtAoGBAJB7
PEEaXU0XIysWzGawooiGfYN/P53eQEC+eKKcg8erAmCX5X+3at4yNX8wRirDZQ5A
yr+iRiP6Oe7VMDn0wOIQ5Umz9kVe6ttOsbduDJgr+jSzqD38qWYOB7r1t8K3TCU2
P1FvKmVDmcu3Jlzunc2z3NyNlI4Qx5pjAQ57Q9TxAoGBAJ0Jy7erEh40S5tvtd09
720oqiLoK1eAoIYx3Buu4hcEWBhVd7x4VlsojCR6WHoxWvFntU+VPbcnyso0y/So
3kWANzSoSV15MmeA/GLc9f+nC8t4rlJH/zXA9LkwAvG//5P2eXidAKpQjpKVnPNT
u7HoOm+enwAqy3gaUnfbRS2x
-----END PRIVATE KEY-----`;


const appId = 'vpaas-magic-cookie-06ce97182b0b467ab55a1192fa968ddb';
// const kid = `${appId}/jitsi`;
const kid = `vpaas-magic-cookie-06ce97182b0b467ab55a1192fa968ddb/6b1caa`;

interface JitsiJwtPayload {
  aud: string;
  iss: string;
  sub: string;
  room: string;
  context: {
    user: {
      id: string;
      name: string;
      avatar?: string;
      email?: string;
      moderator: string;
    };
    features: {
      livestreaming?: boolean;
      recording?: boolean;
      transcription?: boolean;
      "outbound-call"?: boolean;
    };
  };
  exp: number;
  nbf: number;
}

export async function generateJitsiToken(userId: string, userName: string, roomName: string, expiresIn: number = 3600): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    
    const payload: JitsiJwtPayload = {
      aud: 'jitsi',
      iss: 'chat',
      sub: appId,
      room: "*",
      context: {
        user: {
          id: userId,
          name: userName,
          moderator: 'true'
        },
        features: {
          livestreaming: false,
          recording: false,
          transcription: false,
          "outbound-call": false
        }
      },
      exp: now + expiresIn,
      nbf: now
    };
  
    const options: jwt.SignOptions = {
      algorithm: 'RS256',
      header: {
        kid,
        typ: 'JWT',
        alg: 'RS256'
      }
    };
  
    try {
      const token = jwt.sign(payload, privateKey, options);
      return token;
    } catch (error) {
      console.error('Error generating Jitsi token:', error);
      throw new Error('Failed to generate Jitsi token');
    }
  }

