'use client'

import { Lightbox as LightboxComponent, LightboxExternalProps } from 'yet-another-react-lightbox'
import Download from "yet-another-react-lightbox/plugins/download"
import Video from "yet-another-react-lightbox/plugins/video"
import "yet-another-react-lightbox/styles.css"

const Lightbox = (props: LightboxExternalProps) => {
  return <LightboxComponent {...props} plugins={[Download, Video]} controller={{ closeOnBackdropClick: true }} />
}

export default Lightbox
