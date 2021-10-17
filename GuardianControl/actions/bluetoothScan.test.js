const rewire = require("rewire")
const bluetoothScan = rewire("./bluetoothScan")
const _getDevices = bluetoothScan.__get__("_getDevices")
const _requestScanStart = bluetoothScan.__get__("_requestScanStart")
const _receiveScanStart = bluetoothScan.__get__("_receiveScanStart")
const _requestScanStartFailure = bluetoothScan.__get__("_requestScanStartFailure")
const _requestScanStop = bluetoothScan.__get__("_requestScanStop")
const _receiveScanStop = bluetoothScan.__get__("_receiveScanStop")
const _requestScanStopFailure = bluetoothScan.__get__("_requestScanStopFailure")
const _deviceDiscovered = bluetoothScan.__get__("_deviceDiscovered")
const _handleDiscoverDevice = bluetoothScan.__get__("_handleDiscoverDevice")
const _handleScanFinishedEvent = bluetoothScan.__get__("_handleScanFinishedEvent")
const _startScan = bluetoothScan.__get__("_startScan")
const _stopScan = bluetoothScan.__get__("_stopScan")
// @ponicode
describe("_getDevices", () => {
    test("0", () => {
        let callFunction = () => {
            _getDevices()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_requestScanStart", () => {
    test("0", () => {
        let callFunction = () => {
            _requestScanStart()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_receiveScanStart", () => {
    test("0", () => {
        let callFunction = () => {
            _receiveScanStart()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_requestScanStartFailure", () => {
    test("0", () => {
        let callFunction = () => {
            _requestScanStartFailure("ValueError")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _requestScanStartFailure("multiple errors occurred")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _requestScanStartFailure("error")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _requestScanStartFailure("error\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _requestScanStartFailure("invalid choice")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _requestScanStartFailure(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_requestScanStop", () => {
    test("0", () => {
        let callFunction = () => {
            _requestScanStop()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_receiveScanStop", () => {
    test("0", () => {
        let callFunction = () => {
            _receiveScanStop()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_requestScanStopFailure", () => {
    test("0", () => {
        let callFunction = () => {
            _requestScanStopFailure("error")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _requestScanStopFailure("error\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _requestScanStopFailure("ValueError")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _requestScanStopFailure("Message box: foo; bar\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _requestScanStopFailure("multiple errors occurred")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _requestScanStopFailure(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_deviceDiscovered", () => {
    test("0", () => {
        let callFunction = () => {
            _deviceDiscovered({ id: "a85a8e6b-348b-4011-a1ec-1e78e9620782" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _deviceDiscovered({ id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _deviceDiscovered({ id: "7289708e-b17a-477c-8a77-9ab575c4b4d8" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _deviceDiscovered(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_handleDiscoverDevice", () => {
    test("0", () => {
        let callFunction = () => {
            _handleDiscoverDevice("^5.0.0", () => "2017-09-29T19:01:00.000")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _handleDiscoverDevice("4.0.0-beta1\t", () => "Mon Aug 03 12:45:00")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _handleDiscoverDevice("v4.0.0-rc.4", () => "2017-09-29T19:01:00.000")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _handleDiscoverDevice("^5.0.0", () => "2017-09-29T23:01:00.000Z")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _handleDiscoverDevice("^5.0.0", () => "Mon Aug 03 12:45:00")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _handleDiscoverDevice(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_handleScanFinishedEvent", () => {
    test("0", () => {
        let callFunction = () => {
            _handleScanFinishedEvent(() => "c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _handleScanFinishedEvent(() => "bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _handleScanFinishedEvent(() => 12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _handleScanFinishedEvent(() => "da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _handleScanFinishedEvent(() => 9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _handleScanFinishedEvent(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_startScan", () => {
    test("0", () => {
        let callFunction = () => {
            _startScan("da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _startScan(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _startScan("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _startScan("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _startScan(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _startScan(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("_stopScan", () => {
    test("0", () => {
        let callFunction = () => {
            _stopScan(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            _stopScan("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            _stopScan("c466a48309794261b64a4f02cfcc3d64")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            _stopScan("da7588892")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            _stopScan(9876)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            _stopScan(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("bluetoothScan.start", () => {
    test("0", () => {
        let callFunction = () => {
            bluetoothScan.start()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("bluetoothScan.stop", () => {
    test("0", () => {
        let callFunction = () => {
            bluetoothScan.stop()
        }
    
        expect(callFunction).not.toThrow()
    })
})
