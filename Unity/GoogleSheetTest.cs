using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class GoogleSheetTest : MonoBehaviour
{
    void Start()
    {
        // Start the coroutine of sending the request to the API url.
        StartCoroutine(Upload());
        StartCoroutine(Upload());
        StartCoroutine(Upload());
        StartCoroutine(Upload());
        StartCoroutine(Upload());
    }

    IEnumerator Upload()
    {
        // Create the form object.
        WWWForm form = new WWWForm();
        // Add the method data to the form object. (read or write data)
        form.AddField("method", "write");

        // Add the data to the form object. (the data you want to pass to GAS)
        form.AddField("name", "Rempty");
        form.AddField("hp", 50);
        form.AddField("level", "88");
        form.AddField("atk", "100");

        // Sending the request to API url with form object.
        using (UnityWebRequest www = UnityWebRequest.Post("Your API url here!", form))
        {
            yield return www.SendWebRequest();

            if (www.isNetworkError || www.isHttpError)
            {
                Debug.Log(www.error);
            }
            else
            {
                // Done and get the response text.
                print(www.downloadHandler.text);
                Debug.Log("Form upload complete!");
            }
        }
    }
}
