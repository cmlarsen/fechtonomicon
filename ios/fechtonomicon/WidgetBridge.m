#import <React/RCTBridgeModule.h>
#import "fechtonomicon-Swift.h"

@interface WidgetBridge : NSObject <RCTBridgeModule>
@end

@implementation WidgetBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(updateWidgetData:(NSString *)json resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error = nil;
    NSDictionary *jsonObject = [NSJSONSerialization JSONObjectWithData:data options:0 error:&error];

    if (error) {
        reject(@"JSON_ERROR", @"Failed to parse JSON", error);
        return;
    }

    NSUserDefaults *userDefaults = [[NSUserDefaults alloc] initWithSuiteName:@"group.com.yetanothersidequest.fechtonomicon.shared"];

    if (jsonObject[@"title"]) {
        [userDefaults setObject:jsonObject[@"title"] forKey:@"widgetTitle"];
    }

    if (jsonObject[@"description"]) {
        [userDefaults setObject:jsonObject[@"description"] forKey:@"widgetDescription"];
    }

    if (jsonObject[@"discipline"]) {
        [userDefaults setObject:jsonObject[@"discipline"] forKey:@"widgetDiscipline"];
    }

    if (jsonObject[@"id"]) {
        [userDefaults setObject:jsonObject[@"id"] forKey:@"widgetCardId"];
    }

    resolve(nil);
}

RCT_EXPORT_METHOD(reloadWidget:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    if (@available(iOS 14.0, *)) {
        [WidgetHelper reloadWidgets];
        resolve(nil);
    } else {
        reject(@"OS_VERSION_ERROR", @"WidgetKit requires iOS 14 or later", nil);
    }
}

@end
