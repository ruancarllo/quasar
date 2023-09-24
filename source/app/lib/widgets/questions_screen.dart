import 'package:http/http.dart';
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';

class QuestionsScreen extends StatefulWidget {
  const QuestionsScreen({super.key});

  @override QuestionsScreenState createState() => QuestionsScreenState();
}

class QuestionsScreenState extends State<QuestionsScreen> {
  @override Widget build(BuildContext context) {
    final arguments = ModalRoute.of(context)?.settings.arguments as Map<String, String>;
    universityName = arguments['universityName'] as String;

    if (questionImagesBytes.isEmpty) {
      for (int i = 0; i <= initialImageCount; i++) {
        fetchQuestionImageBytes(universityName).then((imageBytes) {
          if (mounted) {
            setState(() {
              if (i == initialImageCount) {
                isFirstLoading = false;
              }

              questionImagesBytes.add(imageBytes);
            });
          }
        });
      }
    }

    if (isFirstLoading) {
      return const Scaffold(
        body: Center(
          child: QuestionProgressIndicator()
        ),
      );
    }

    else {
      return Scaffold(
        body: Container(
          padding: const EdgeInsets.all(30),
          color: Colors.white,
          child: ListView.builder(
            controller: scrollController,
            itemCount: questionImagesBytes.length + 1,
            itemBuilder: (context, index) {
              if (index != questionImagesBytes.length) {
                return Image.memory(
                  questionImagesBytes[index],
                  fit: BoxFit.contain,
                );
              } else {
                return Container(
                  margin: const EdgeInsets.only(
                    top: 30
                  ),
                  child: const Center(
                    child: QuestionProgressIndicator()
                  ),
                );
              }
            },
          ),
        ),
      );
    }
  }

  @override void initState() {
    super.initState();
    scrollController.addListener(onScroll);
  }

  @override void dispose() {
    scrollController.dispose();
    super.dispose();
  }

  void onScroll() {
    if (scrollController.position.pixels >= scrollController.position.maxScrollExtent - 500) {
      if (!isAddingQuestionImage) {
        isAddingQuestionImage = true;
        fetchQuestionImageBytes(universityName).then((imageBytes) {
          if (mounted) {
            setState(() {
              questionImagesBytes.add(imageBytes);
            });
          }
          isAddingQuestionImage = false;
        });
      }
    }
  }
  
  Future<Uint8List> fetchQuestionImageBytes(String universityName) async {
    if (kDebugMode) {
      print('Fetched image from $universityName');
    }

    final Uri apiURI = Uri.parse('https://server.carllotech.repl.co/api/random-proccessed-question?universityName=$universityName');
    final Response apiResponse = await get(apiURI);
    
    return apiResponse.bodyBytes;
  }

  final ScrollController scrollController = ScrollController();
  
  late String universityName;
  final List<Uint8List> questionImagesBytes = [];

  final int initialImageCount = 3;

  bool isAddingQuestionImage = false;
  bool isFirstLoading = true;

}

class QuestionProgressIndicator extends StatelessWidget {
  const QuestionProgressIndicator({super.key});

  @override Widget build(BuildContext context) {
    return const CircularProgressIndicator(
      valueColor: AlwaysStoppedAnimation<Color>(Colors.deepPurple)
    );
  }
}