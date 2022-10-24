import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.css";

export const TARGET_CHAIN = "0x38";
export const DECIMALS = 18;
export const USDT_DECIMALS = 18;

export function formatDecimalPrice(price, digits) {
  const re = RegExp(`^-?\\d*\\.?0*\\d{0,${digits}}`);
  return +(price || 0).toFixed(20).match(re)[0];
}

export function withCommas(num) {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function formatFnd(num) {
  return withCommas(formatDecimalPrice(+num / 10 ** DECIMALS, 2));
}

export function formatUsd(num) {
  return withCommas(formatDecimalPrice(+num / 10 ** USDT_DECIMALS, 2));
}

export function formatUsdInput(num) {
  return formatDecimalPrice(+num / 10 ** USDT_DECIMALS, 2);
}

function extractWeb3Error(err) {
  const errMatch = err.message.match(/"message": "(.+)"/);
  if (errMatch && errMatch.length > 1) {
    return errMatch[1];
  } else if (!!err.reason || !!err.message) {
    return err.reason || err.message;
  } else {
    return err;
  }
}

export async function sendTx(tx, okMsg, value) {
  const postTx = await tx()
    .then((tx) => {
      return tx;
    })
    .catch((err) => {
      iziToast.destroy();
      iziToast.error({
        message: extractWeb3Error(err),
        position: "bottomLeft",
      });
      return false;
    });
  if (!postTx) {
    return false;
  }

  iziToast.info({
    message: "Waiting for transaction to be resolved...",
    timeout: 30000,
    position: "bottomLeft",
  });
  return postTx
    .wait()
    .then(() => {
      iziToast.destroy();
      iziToast.success({
        message: okMsg,
        position: "bottomLeft",
      });
      return true;
    })
    .catch((err) => {
      iziToast.destroy();
      iziToast.error({
        message: extractWeb3Error(err),
        position: "bottomLeft",
      });
      return false;
    });
}

export function popupError(message) {
  iziToast.error({
    message,
    position: "bottomLeft",
  });
}

export function popupInfo(message) {
  iziToast.info({
    message,
    position: "bottomLeft",
  });
}

export async function switchNetwork(provider) {
  try {
    await provider.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: TARGET_CHAIN }],
    });
    return true;
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await provider.provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: TARGET_CHAIN,
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
              chainName: "Binance Smart Chain",
              nativeCurrency: {
                name: "Binance Token",
                symbol: "BNB",
                decimals: 18,
              },
              blockExplorerUrls: ["https://bscscan.com/"],
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    }
    return false;
  }
}
