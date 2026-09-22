<?php
require_once dirname(__FILE__) . '/config.php';

function send() {
  $request = array(
      'phone' => $_POST['phone'],
      'api_key' => ACLandingConfig::API_KEY,  // добавляем апи ключ к запросу (можно взять из пп)
    );
  $request_url = ACLandingConfig::VALIDATE_PHONE;

  $ch = curl_init($request_url);
  curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_POST           => true,
    CURLOPT_SSL_VERIFYPEER => 0,
    CURLOPT_SSL_VERIFYHOST => 0,
    CURLOPT_HTTPHEADER     => $_SERVER,
    CURLOPT_POSTFIELDS     => http_build_query($request, '', '&'),
  ));

  $resp = curl_exec($ch);
  $error = curl_error($ch);
  $http_code  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  $data = array(
    "status" => "ok"
  );

  if($http_code == 400){
    $data["status"] = "blacklisted";
  };

  if($error){
    $resp = json_encode(array(
    "code" => "exception",
    "error" => $error,
    "body" =>  $resp,
    "http_code" => $http_code
    ));

    $data = array(
      "status" => "error"
    );
  }
//   var_dump($resp);

  return $data;
}

header('Content-Type: application/json');
$resp = send();
echo json_encode($resp);
