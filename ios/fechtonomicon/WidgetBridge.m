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

    if (jsonObject[@"term"]) {
        [userDefaults setObject:jsonObject[@"term"] forKey:@"widgetTerm"];
    }

    if (jsonObject[@"translation"]) {
        [userDefaults setObject:jsonObject[@"translation"] forKey:@"widgetTranslation"];
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

RCT_EXPORT_METHOD(updateAllTerms:(NSString *)json resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSURL *containerURL = [[NSFileManager defaultManager] containerURLForSecurityApplicationGroupIdentifier:@"group.com.yetanothersidequest.fechtonomicon.shared"];
    NSURL *fileURL = [containerURL URLByAppendingPathComponent:@"terms.json"];

    NSError *error = nil;
    [json writeToURL:fileURL atomically:YES encoding:NSUTF8StringEncoding error:&error];

    if (error) {
        reject(@"FILE_WRITE_ERROR", @"Failed to write terms.json", error);
    } else {
        resolve(nil);
    }
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
