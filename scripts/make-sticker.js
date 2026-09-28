// Cut a pet out of a photo with macOS Vision and add a white die-cut border.
// Usage (macOS 14+): npm run sticker -- photo.jpg src/assets/stickers/name.png [borderPercent]
ObjC.import('Foundation'); ObjC.import('Vision'); ObjC.import('CoreImage'); ObjC.import('AppKit');
function run(argv){
  const [inP, outP, borderPct] = argv;
  const url = $.NSURL.fileURLWithPath(inP);
  const handler = $.VNImageRequestHandler.alloc.initWithURLOptions(url, $.NSDictionary.dictionary);
  const req = $.VNGenerateForegroundInstanceMaskRequest.alloc.init;
  const err = Ref();
  if (!handler.performRequestsError($.NSArray.arrayWithObject(req), err)) return 'perform failed';
  if (req.results.count == 0) return 'no subject';
  const obs = req.results.objectAtIndex(0);
  const buf = obs.generateMaskedImageOfInstancesFromRequestHandlerCroppedToInstancesExtentError(obs.allInstances, handler, true, err);
  let img = $.CIImage.imageWithCVPixelBuffer(buf);
  const ext = img.extent;
  const w = ext.size.width, h = ext.size.height;
  const r = Math.round(Math.max(w, h) * (parseFloat(borderPct || '2.4') / 100));
  // Move the subject away from the edges so the border has room.
  const t = $.NSAffineTransform.transform; t.translateXByYBy(r + 2, r + 2);
  const mv = $.CIFilter.filterWithName("CIAffineTransform");
  mv.setValueForKey(img, "inputImage"); mv.setValueForKey(t, "inputTransform");
  img = mv.outputImage;
  const pad = {origin: {x: 0, y: 0}, size: {width: w + 2 * r + 4, height: h + 2 * r + 4}};
  const clear = $.CIImage.imageWithColor($.CIColor.colorWithRedGreenBlueAlpha(0, 0, 0, 0)).imageByCroppingToRect(pad);
  const base = img.imageByCompositingOverImage(clear);
  // Dilate alpha, then paint everything white while keeping the dilated alpha.
  const dil = $.CIFilter.filterWithName('CIMorphologyMaximum');
  dil.setValueForKey(base, 'inputImage'); dil.setValueForKey($.NSNumber.numberWithDouble(r), 'inputRadius');
  const soft = $.CIFilter.filterWithName('CIGaussianBlur');
  soft.setValueForKey(dil.outputImage, 'inputImage'); soft.setValueForKey($.NSNumber.numberWithDouble(1.2), 'inputRadius');
  const white = $.CIFilter.filterWithName('CIColorMatrix');
  white.setValueForKey(soft.outputImage.imageByCroppingToRect(pad), 'inputImage');
  white.setValueForKey($.CIVector.vectorWithXYZW(0,0,0,0), 'inputRVector');
  white.setValueForKey($.CIVector.vectorWithXYZW(0,0,0,0), 'inputGVector');
  white.setValueForKey($.CIVector.vectorWithXYZW(0,0,0,0), 'inputBVector');
  white.setValueForKey($.CIVector.vectorWithXYZW(0,0,0,1), 'inputAVector');
  white.setValueForKey($.CIVector.vectorWithXYZW(1,1,1,0), 'inputBiasVector');
  // Premultiply so the white fades cleanly at the anti-aliased edge.
  const pre = $.CIFilter.filterWithName('CIPremultiply');
  pre.setValueForKey(white.outputImage, 'inputImage');
  const out = base.imageByCompositingOverImage(pre.outputImage).imageByCroppingToRect(pad);
  const cs = $.CGColorSpaceCreateWithName($.kCGColorSpaceSRGB);
  const ok = $.CIContext.context.writePNGRepresentationOfImageToURLFormatColorSpaceOptionsError(out, $.NSURL.fileURLWithPath(outP), $.kCIFormatRGBA8, cs, $.NSDictionary.dictionary, err);
  return ok ? `ok ${Math.round(w)}x${Math.round(h)} border=${r}` : 'write failed';
}
