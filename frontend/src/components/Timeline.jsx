import React from "react"
import { useParams } from "react-router-dom"

const Timeline = (props) => {
  const { widgetProps, widgetPropsAny } = props
  const { ticker } = useParams()
  const ref = React.createRef()

  React.useEffect(() => {
    let refValue

    if (ref.current) {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/external-embedding/"
        + "embed-widget-timeline.js"

      script.async = true
      script.type = "text/javascript"
      script.innerHTML = JSON.stringify({
        "colorTheme": "light",
        "isTransparent": false,
        "displayMode": "regular",
        "width": "100%",
        "height": 830,
        "locale": "en",
        "feedmode": "symbol",
        "symbol": ticker,
      })

      ref.current.appendChild(script)
      refValue = ref.current
    }

    return () => {
      if (refValue) {
        while (refValue.firstChild) {
          refValue.removeChild(refValue.firstChild)
        }
      }
    }
  }, [ref, widgetProps, widgetPropsAny])

  return <div ref={ref} />
}

export default Timeline
